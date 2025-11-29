import { cn } from "@/lib/utils"; // adjust path to your utils

const SettingsSidebar = ({ menuItems, active, onChange }) => (
  <nav className="flex flex-col gap-1 rounded-xl border border-[#FFFFFF1A] bg-black p-4">
    <p className="mb-2 border-white/10 border-b font-medium text-lg">
      Settings
    </p>

    {menuItems.map(({ key, label, icon: Icon }) => (
      <button
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-lg border-white/10 py-3 pr-6 pl-4 text-gray-300 text-sm transition hover:border-white/10 hover:border-b-2 hover:bg-white/10",
          active === key &&
            "border-white/10 border-b-2 bg-white/5 font-medium text-white"
        )}
        key={key}
        onClick={() => onChange(key)}
        type="button"
      >
        <Icon size={18} />
        {label}
      </button>
    ))}
  </nav>
);

export default SettingsSidebar;
