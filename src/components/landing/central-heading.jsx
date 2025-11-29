export default function CentralHeading({
  title = "Features",
  className = "",
  showBorders = false,
}) {
  return (
    <section
      className={`bg-[var(--background)] px-4 py-16 ${className} ${showBorders ? "border-[var(--border)] border-t border-b" : ""}`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-center gap-8">
          {/* Left decorative line */}
          <div className="h-1 max-w-32 flex-1 rounded-full bg-gradient-to-l from-[var(--text)]/25 via-[var(--border)] to-transparent" />
          {/* Features title */}
          <h2 className="text-center font-semibold text-[var(--text)] text-xl tracking-wide sm:text-2xl md:text-3xl lg:text-4xl">
            {title}
          </h2>

          <div className="h-1 max-w-32 flex-1 rounded-full bg-gradient-to-r from-[var(--text)]/25 via-[var(--border)] to-transparent" />
          {/* Right decorative line */}
        </div>
      </div>
    </section>
  );
}
