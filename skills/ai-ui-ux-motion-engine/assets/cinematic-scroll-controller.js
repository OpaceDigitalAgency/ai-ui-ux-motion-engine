export function attachCinematicScroll(root) {
  const video = root.querySelector("[data-cinematic-video]");
  if (!video) return () => {};

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = navigator.connection?.saveData === true;
  let frame = 0;
  let pendingProgress = 0;
  let pendingTime = 0;
  let seekInFlight = false;
  let hasDecodedFrame = false;
  let active = false;

  const revealDecodedFrame = () => {
    if (hasDecodedFrame || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
    hasDecodedFrame = true;
    root.dataset.cinematicReady = "true";
  };

  const seekLatest = () => {
    if (
      !active ||
      seekInFlight ||
      !Number.isFinite(video.duration) ||
      video.duration <= 0
    ) {
      return;
    }
    const threshold = 1 / 30;
    if (Math.abs(video.currentTime - pendingTime) <= threshold) return;
    seekInFlight = true;
    video.currentTime = pendingTime;
  };

  const update = () => {
    frame = 0;
    if (!active || !video.duration || reduceMotion.matches || saveData) return;
    const maxScroll = Math.max(1, root.offsetHeight - innerHeight);
    const top = root.getBoundingClientRect().top;
    pendingProgress = Math.min(1, Math.max(0, -top / maxScroll));
    pendingTime = pendingProgress * Math.max(0, video.duration - 0.001);
    seekLatest();
    root.style.setProperty("--cinematic-progress", String(pendingProgress));
  };

  const requestUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const handleSeeked = () => {
    seekInFlight = false;
    revealDecodedFrame();
    seekLatest();
  };

  const handleError = () => {
    root.dataset.cinematicFailed = "true";
  };

  const observer = new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
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
  video.addEventListener("loadeddata", revealDecodedFrame);
  video.addEventListener("canplay", revealDecodedFrame);
  video.addEventListener("seeked", handleSeeked);
  video.addEventListener("error", handleError);
  reduceMotion.addEventListener?.("change", requestUpdate);
  observer.observe(root);

  return () => {
    observer.disconnect();
    removeEventListener("scroll", requestUpdate);
    removeEventListener("resize", requestUpdate);
    video.removeEventListener("loadedmetadata", requestUpdate);
    video.removeEventListener("loadeddata", revealDecodedFrame);
    video.removeEventListener("canplay", revealDecodedFrame);
    video.removeEventListener("seeked", handleSeeked);
    video.removeEventListener("error", handleError);
    reduceMotion.removeEventListener?.("change", requestUpdate);
    if (frame) cancelAnimationFrame(frame);
  };
}
