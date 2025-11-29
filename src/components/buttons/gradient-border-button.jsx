import PrimaryButton from "./primary-button";

const GradientBorderButton = ({ title, className = "", onClick, ...props }) => (
  <div className="rounded-full bg-[linear-gradient(45.94deg,#080D12_8.52%,rgba(255,255,255,0.4)_48.45%,#080D12_87.09%)] p-[2px]">
    <PrimaryButton
      className={`w-full rounded-full bg-[var(--button-bg)] font-medium text-[var(--button-text)] text-sm 2xl:text-lg ${className}`}
      title={title}
      {...props}
      onClick={onClick}
    />
  </div>
);

export default GradientBorderButton;
