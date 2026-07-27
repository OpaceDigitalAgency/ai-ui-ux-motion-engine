export function attachCinematicScroll(root) {
  const video = root.querySelector("[data-cinematic-video]");
  if (!video) return () => {};

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = navigator.connection?.saveData === true;
  let frame = 0;
  let pendingProgress = 0;

  const update = () => {
    frame = 0;
    if (!video.duration || reduceMotion.matches || saveData) return;
    const maxScroll = Math.max(1, root.offsetHeight - innerHeight);
    const top = root.getBoundingClientRect().top;
    pendingProgress = Math.min(1, Math.max(0, -top / maxScroll));
    const nextTime = pendingProgress * video.duration;
    if (Math.abs(video.currentTime - nextTime) > 1 / 60) {
      video.currentTime = nextTime;
    }
    root.style.setProperty("--cinematic-progress", String(pendingProgress));
  };

  const requestUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      addEventListener("scroll", requestUpdate, { passive: true });
      addEventListener("resize", requestUpdate, { passive: true });
      requestUpdate();
    } else {
      removeEventListener("scroll", requestUpdate);
      removeEventListener("resize", requestUpdate);
    }
  });

  video.pause();
  video.addEventListener("loadedmetadata", requestUpdate);
  reduceMotion.addEventListener?.("change", requestUpdate);
  observer.observe(root);

  return () => {
    observer.disconnect();
    removeEventListener("scroll", requestUpdate);
    removeEventListener("resize", requestUpdate);
    video.removeEventListener("loadedmetadata", requestUpdate);
    reduceMotion.removeEventListener?.("change", requestUpdate);
    if (frame) cancelAnimationFrame(frame);
  };
}
