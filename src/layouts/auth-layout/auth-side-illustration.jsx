// Constants
const SPEED = 0.7;

function AuthSideIllustration() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <video
        autoPlay
        className="h-full w-full object-cover"
        loop
        muted
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

      {/* Top Right Glow */}
      <div className="-translate-y-[30%] absolute top-0 right-0 h-64 w-64 translate-x-[30%] rounded-full bg-gradient-to-br from-[#24028E]/80 via-[#24028E]/40 to-transparent shadow-[0_0_100px_50px_rgba(36,2,142,0.6)] blur-[40px]" />

      {/* Bottom Left Glow */}
      <div className="-translate-x-[30%] absolute bottom-0 left-0 h-32 w-32 translate-y-[30%] rounded-full bg-gradient-to-br from-[#24028E]/80 via-[#24028E]/40 to-transparent shadow-[0_0_100px_50px_rgba(36,2,142,0.6)] blur-[40px]" />
    </section>
  );
}

export default AuthSideIllustration;
