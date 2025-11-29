import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import { LogoIcons } from "@/components/shared/logos";
import { NAVIGATION_DATA } from "@/data/navbar-data";
import {
  createDebouncedScrollHandler,
  handleNavigationClick,
  isPathActive,
} from "@/lib/scroll-utils";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/use-auth-store";
import {
  getAccessToken,
  getDashboardRoute,
  isUserAuthenticated,
} from "@/utils/auth-utils";

const LayoutNavbar = () => {
  const [_isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken) || getAccessToken();

  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is properly authenticated (both user data and valid token)
  const isAuthenticated = isUserAuthenticated(user, accessToken);

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      const dashboardRoute = getDashboardRoute(user);
      navigate(dashboardRoute);
    } else {
      // If not properly authenticated, redirect to login
      navigate("/auth/login");
    }
  };

  const handleNavClick = (path, event) => {
    handleNavigationClick(
      path,
      event,
      () => setIsMenuOpen(false), // Close mobile menu
      (navPath) => navigate(navPath) // Handle regular navigation
    );
  };

  useEffect(() => {
    const debouncedScrollHandler = createDebouncedScrollHandler(
      () => setIsScrolled(window.scrollY > 10),
      16 // ~60fps
    );

    window.addEventListener("scroll", debouncedScrollHandler, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", debouncedScrollHandler);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="container mx-auto px-3 sm:px-10">
        <div
          className={cn(
            "flex items-center justify-between rounded-[14px] px-6 py-4 transition-all",
            "!border-[#FFFFFF26] bg-black bg-opacity-[0.3] backdrop-blur-md"
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-1">
            <LogoIcons.aiLogo className="h-14 w-14" />
            <h1 className="gradient-text font-semibold text-2xl">Staron AI</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 font-poppins text-sm xl:flex">
            {NAVIGATION_DATA.main.map((item) => (
              <Link
                className={cn(
                  isPathActive(item.path, location.pathname)
                    ? "font-semibold text-secondary hover:text-secondary"
                    : "font-light text-white hover:text-secondary",
                  "transition-colors"
                )}
                key={item.id}
                onClick={(event) => handleNavClick(item.path, event)}
                to={item.path}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-4 xl:flex">
            {isAuthenticated ? (
              <PrimaryButton
                className="rounded-full px-10 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66]"
                onClick={handleDashboardClick}
                title="Dashboard"
              />
            ) : (
              <>
                <PrimaryButton
                  className="rounded-full bg-transparent text-base underline"
                  onClick={() => navigate("/auth/login")}
                  title="Sign In"
                />
                <PrimaryButton
                  className="rounded-full px-10 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66]"
                  onClick={() => navigate("/auth/select-role")}
                  title="Sign Up"
                />
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-white transition hover:bg-white/10 xl:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>{isMenuOpen ? "Close menu" : "Open menu"}</title>
              {isMenuOpen ? (
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              ) : (
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-2 rounded-2xl border border-[var(--border)]/50 bg-[var(--card-bg)]/95 p-6 shadow-xl backdrop-blur-md xl:hidden">
            <ul className="space-y-4 font-poppins text-sm">
              {NAVIGATION_DATA.main.map((item) => (
                <li key={item.id}>
                  <Link
                    className={cn(
                      isPathActive(item.path, location.pathname)
                        ? "font-semibold text-secondary"
                        : "text-gray-300",
                      "block font-semibold transition hover:text-secondary"
                    )}
                    onClick={(event) => handleNavClick(item.path, event)}
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              {isAuthenticated ? (
                <PrimaryButton
                  className="rounded-full px-10 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66]"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleDashboardClick();
                  }}
                  title="Dashboard"
                />
              ) : (
                <>
                  <PrimaryButton
                    className="rounded-full bg-transparent text-base underline"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/auth/login");
                    }}
                    title="Sign In"
                  />
                  <PrimaryButton
                    className="rounded-full px-10 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66]"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/auth/select-role");
                    }}
                    title="Sign Up"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LayoutNavbar;
