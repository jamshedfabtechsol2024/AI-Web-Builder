import PropTypes from "prop-types";
import { memo } from "react";
import { Calendar, Sun } from "lucide-react";

function CreditsCard({ remainingMonthly, remainingDaily }) {
  return (
    <div className="relative flex flex-col gap-6 rounded-3xl bg-[var(--price-card-bg)] p-6 shadow-[0_0_40px_0_rgba(0,0,0,0.08)] border border-[var(--light-blue)] hover:shadow-[0_0_60px_10px_rgba(0,110,255,0.3)] transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-[var(--text)] font-bold text-lg">
          Remaining Credits
        </h2>
      </div>

      {/* Credit Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Monthly Credits */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[var(--input)] shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-transform duration-200">
          <div className="flex items-center gap-2 text-[var(--text)]/70">
            <Calendar className="text-[var(--light-blue)] w-4 h-4" />
            <span className="text-xs font-semibold">Monthly Credits</span>
          </div>
          <h3 className="text-[var(--light-blue)] font-bold text-2xl">
            {remainingMonthly}
          </h3>
        </div>

        {/* Daily Credits */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[var(--input)] shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-transform duration-200">
          <div className="flex items-center gap-2 text-[var(--text)]/70">
            <Sun className="text-yellow-400 w-4 h-4" />
            <span className="text-xs font-semibold">Daily Credits</span>
          </div>
          <h3 className="text-yellow-400 font-bold text-2xl">
            {remainingDaily}
          </h3>
        </div>
      </div>
    </div>
  );
}

CreditsCard.propTypes = {
  remainingMonthly: PropTypes.number.isRequired,
  remainingDaily: PropTypes.number.isRequired,
};

export default memo(CreditsCard);
