const CentralLine = ({
  showRightDot = false,
  rightDotMobileOnly = false,
  orientation = "horizontal",
  className,
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={`flex items-center ${
        isHorizontal ? "flex-row" : "flex-col"
      } ${className}`}
    >
      {/* Left/Top dot */}
      <div className="rounded-full bg-[#26486A] p-[3px]" />

      {/* Line */}
      <div
        className={`bg-[#26486A] ${
          isHorizontal ? "h-px flex-1" : "w-px flex-1"
        }`}
      />

      {/* Right/Bottom dot */}
      {showRightDot && <div className="rounded-full bg-[#26486A] p-[3px]" />}

      {/* Right/Bottom dot only on small screens */}
      {rightDotMobileOnly && (
        <div className="rounded-full bg-[#26486A] p-[3px] md:hidden" />
      )}
    </div>
  );
};

export default CentralLine;
