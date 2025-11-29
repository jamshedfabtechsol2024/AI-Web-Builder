import { Link } from "react-router-dom";
import { LogoIcons } from "@/components/shared/logos";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NAVIGATION_DATA } from "@/data/navbar-data";
import { handleNavigationClick } from "@/lib/scroll-utils";

const LayoutFooter = () => {
  const handleLinkClick = (path, event) => {
    handleNavigationClick(path, event);
  };

  return (
    <footer className="w-full bg-[var(--glassic)] px-6 py-12 lg:px-12">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-primary/10 p-8">
            <LogoIcons.aiLogo className="h-20 w-20" />
          </div>

          {/* Navigation Links */}
          <nav className="mb-4 flex flex-wrap justify-center gap-6">
            {NAVIGATION_DATA.main.map((link) => (
              <Link
                className="text-[var(--gray)] transition-colors hover:text-[var(--blue)]"
                key={link.id}
                onClick={(event) => handleLinkClick(link.path, event)}
                to={link.path}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Footer Bottom Section */}
          <div className="w-full">
            <div className="mt-12 flex flex-col items-center justify-between border-[var(--border)] border-t pt-8 sm:flex-row">
              <p className="text-center text-[var(--text)] text-sm md:text-start">
                {NAVIGATION_DATA.copyright}
              </p>
              <div className="mt-4 flex gap-6 sm:mt-0">
                {NAVIGATION_DATA.legal.map((link) => (
                  <Link
                    className="text-[var(--text)] text-sm transition-colors hover:text-[var(--blue)]"
                    key={link.id}
                    onClick={(event) => handleLinkClick(link.path, event)}
                    to={link.path}
                  >
                    {link.label}
                  </Link>
                ))}
                {/* <ThemeToggle /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
