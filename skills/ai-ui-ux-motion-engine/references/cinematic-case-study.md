# Cinematic production lessons

This case study records reusable evidence from an identity-locked technical
product film. It is not a provider guarantee.

## What failed

- Crossfading stills and CSS zooms did not create a cinematic product journey.
- A coherent orbit was visually stable but lacked explanatory progression.
- Short generated transformations invented internal hardware.
- An eight-part installation clip rotated, reshaped and respaced rigid parts.
- A five-second lid action was usable source material but too slight for a
  flagship hero.
- An edit made from individually plausible clips still felt discontinuous.
- Ordinary long-GOP H.264 showed visible jitter when scrubbed directly.
- A short-GOP crossfade montage still exposed stale or poster-like frames under
  rapid seeking; normal playback and settled checkpoints had hidden the fault.
- A separately selected poster had the right dimensions but a tighter crop, so
  the product visibly changed scale when the first video frame replaced it.

## What worked

- One identity-authority exterior plus ordered shot-specific references.
- A clearly timed multi-shot film with hard cuts and immutable count/geometry
  instructions.
- One authorised paid attempt on a model capable of multi-reference,
  multi-shot generation.
- Dense frame inspection around the most mechanically difficult movement.
- Honest acceptance of a missing requested shot rather than claiming parity.
- A silent all-intra H.264 derivative for direct seeking.
- A poster generated from the exact shipping derivative and machine-compared
  with its first decoded frame before browser integration.
- A seek-serialising controller that retained only the newest target and
  latched the decoded video visible instead of re-exposing the poster.
- An isolated private route, six sampled scroll positions and responsive,
  reduced-motion validation before any public integration.
- Adversarial full-speed forward, reverse and direction-change tests with zero
  poster exposure.

## General lesson

Start with the film and its truth constraints. Prove the signature experience
privately, then build the page around the approved asset. Supporting shots
should remain short and single-action. Reuse one flagship film across several
chapters before commissioning additional flagship films.

Treat a scrubber as an adversarial random-access system, not as ordinary video
playback. Validate the exact shipping bytes, serialize seeks and fail over to a
canvas sequence or poster when the stress gate does not pass. Matching width
and height do not prove a seamless handoff: validate first-frame similarity and
identical browser geometry too.
