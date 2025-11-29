import { Outlet } from "react-router-dom";
import PrimaryRotatingVideo from "@/components/auth/primary-rotating-video";
import AuthSideIllustration from "./auth-side-illustration";

function AuthLayout() {
  return (
    <main className="flex min-h-screen w-full items-center justify-between">
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--background)] p-4 md:p-10 lg:w-1/2 2xl:p-30">
        <PrimaryRotatingVideo isMobile={true} />
        <div className="relative w-full max-w-lg">
          <Outlet />
        </div>
      </section>

      <aside className="fixed top-0 right-0 hidden h-screen lg:block lg:w-1/2">
        <AuthSideIllustration />
      </aside>
    </main>
  );
}

export default AuthLayout;
