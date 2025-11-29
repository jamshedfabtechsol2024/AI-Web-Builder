import { memo } from "react";

// Constants
const SPEED = 0.5;

const RotatingVideo = memo(({ src = "/videos/landing-hero-bg.mp4" }) => (
  <video
    autoPlay
    className="absolute inset-0 h-full w-full object-cover"
    loop
    muted
    playsInline
    ref={(video) => {
      if (video) {
        video.playbackRate = SPEED;
      }
    }}
    src={src}
    style={{
      willChange: "transform",
      transform: "translateZ(0)",
      backfaceVisibility: "hidden",
    }}
  />
));

RotatingVideo.displayName = "RotatingVideo";

export default RotatingVideo;
