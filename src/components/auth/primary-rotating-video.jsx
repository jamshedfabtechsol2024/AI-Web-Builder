import { memo } from "react";

// Constants
const SPEED = 0.5;

const PrimaryRotatingVideo = memo(({ isMobile = "false" }) => {
  return (
    <>
      <video
        autoPlay
        className="absolute inset-0 min-h-screen w-full object-cover md:hidden"
        loop
        muted
        playsInline
        ref={(video) => {
          if (video) {
            video.playbackRate = SPEED;
          }
        }}
        src="/videos/globe-video.mp4"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Mobile Overlay */}
      {isMobile && <div className="absolute inset-0 bg-black/60 md:hidden" />}

      {/* Top Right Glow (mobile & md only) */}
      <div className="-translate-y-[30%] absolute top-0 right-0 h-40 w-40 translate-x-[30%] rounded-full bg-gradient-to-br from-[#24028E]/80 via-[#24028E]/40 to-transparent shadow-[0_0_80px_40px_rgba(36,2,142,0.6)] blur-[30px] md:h-64 md:w-64 md:shadow-[0_0_100px_50px_rgba(36,2,142,0.6)] lg:hidden" />

      {/* Bottom Left Glow (mobile & md only) */}
      <div className="-translate-x-[30%] absolute bottom-0 left-0 h-24 w-24 translate-y-[30%] rounded-full bg-gradient-to-br from-[#24028E]/80 via-[#24028E]/40 to-transparent shadow-[0_0_80px_40px_rgba(36,2,142,0.6)] blur-[30px] md:h-32 md:w-32 md:shadow-[0_0_100px_50px_rgba(36,2,142,0.6)] lg:hidden" />
    </>
  );
});

PrimaryRotatingVideo.displayName = "PrimaryRotatingVideo";

export default PrimaryRotatingVideo;
