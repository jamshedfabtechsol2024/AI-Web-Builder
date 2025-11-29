import { useState } from "react";
import RotatingVideo from "@/components/auth/rotating-video";
import PromptInputComponent from "@/components/input/prompt-input-component";
import { useAuthStore } from "@/store/use-auth-store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const user = useAuthStore((s) => s.user);

  const handleSubmit = () => {
    if (user?.role !== "user") {
      toast.error("Please log in as a user to continue.");
      navigate("/auth/login");
      return;
    }

    navigate("/recently");
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      id="hero-section"
    >
      {/* Background Video */}
      <RotatingVideo />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Glow orb (centered, behind text) */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-48 w-48 rounded-full bg-gradient-to-br from-[var(--blue)]/80 via-[var(--blue)]/70 to-transparent shadow-[0_0_160px_80px_rgba(36,2,142,0.6)] blur-[90px] md:h-80 md:w-80" />

      {/* Centered content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center text-[var(--text)]">
        <div className="w-full max-w-2xl px-4">
          <h1 className="font-bold text-4xl text-white sm:text-6xl">
            Build Smarter. Code Less. Finish Faster.
          </h1>
          <p className="mt-4 text-[var(--text)] text-lg sm:text-xl">
            Visually design and deploy AI-powered apps
            <br /> — and if you’re stuck, our expert developers can jump in to
            fix and complete your project on demand
          </p>
        </div>
      </div>

      {/* Prompt input at the end of the section */}
      <div className="-translate-x-1/2 absolute bottom-10 left-1/2 z-10 w-full max-w-4xl px-4">
        <PromptInputComponent
          onChange={(data) => setValue(data)}
          value={value}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}

export default HeroSection;
