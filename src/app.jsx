import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
// Auth
import ForgotPage from "@/pages/auth/forgot-page";
import LoginPage from "@/pages/auth/login-page";
import OtpPage from "@/pages/auth/otp-page";
import ResetPage from "@/pages/auth/reset-page";
import SelectRolePage from "@/pages/auth/select-role-page";
import SignUpPage from "@/pages/auth/signup-page";
import ProtectedRoute from "./components/auth/protected-route";
// Layout
import AuthLayout from "./layouts/auth-layout/auth-layout";
import DashboardLayout from "./layouts/dashboard-layout/dashboard-layout";
import LandingLayout from "./layouts/landing-layout/landing-layout";

/**
 * Dashboard
 */

// Admin
import AdminDashboardPage from "@/pages/dashboard/admin/dashboard/admin-dashboard-page";

// Developer
import DeveloperDashboardPage from "@/pages/dashboard/developer/dasboard/developer-dashboard-page";

// User
import HomePage from "@/pages/home/home-page";
import CreateProjectLayout from "./layouts/create-project-layout/create-project-layout";
import UserDashboardLayout from "./layouts/user-dashboard-layout/user-dashboard-layout";
import SocialError from "./pages/auth/social-error";
import SocialSuccess from "./pages/auth/social-sucess";
import CreateProject from "./pages/create-project/create-project";
import AdminDevelopers from "./pages/dashboard/admin/developers/admin-developers";
import DeveloperDetails from "./pages/dashboard/admin/developers/developer-details";
import AdminProjects from "./pages/dashboard/admin/projects/admin-projects";
import ProjectDetail from "./pages/dashboard/admin/projects/project-detail";
import AdminRequests from "./pages/dashboard/admin/requests/admin-requests";
import RequestDetail from "./pages/dashboard/admin/requests/request-detail";
import AdminSettings from "./pages/dashboard/admin/settings/admin-settings";
import NotificationsSettings from "./pages/dashboard/admin/settings/notifications-settings";
import PlatformSettings from "./pages/dashboard/admin/settings/platform-settings";
import ProfileSettings from "./pages/dashboard/admin/settings/profile-settings";
import SecuritySettings from "./pages/dashboard/admin/settings/security-settings";
import AdminSubscription from "./pages/dashboard/admin/subscription/admin-subscription";
import AdminUsers from "./pages/dashboard/admin/users/admin-users";
import Chats from "./pages/dashboard/developer/chats/chats";
import DeveloperEarnings from "./pages/dashboard/developer/earnings/developer-earnings";
import DevelopersProjects from "./pages/dashboard/developer/projects/developers-projects";
import DeveloperRequests from "./pages/dashboard/developer/requests/developer-requests";
import DeveloperReviews from "./pages/dashboard/developer/reviews/developer-reviews";
import CreateOffer from "./pages/dashboard/developer/service-plan/create-offer";
import DeveloperServicePlans from "./pages/dashboard/developer/service-plan/developer-service-plans";
import DeveloperNotifications from "./pages/dashboard/developer/settings/developer-notifications";
import DeveloperProfile from "./pages/dashboard/developer/settings/developer-profile";
import DeveloperSettings from "./pages/dashboard/developer/settings/developer-settings";
import IntegrationSettings from "./pages/dashboard/developer/settings/integration-settings";
import TwoFactorSettings from "./pages/dashboard/developer/settings/two-factor-settings";
import DeveloperSupport from "./pages/dashboard/developer/support/developer-support";
import HireDeveloper from "./pages/dashboard/user/hire-developer/hire-developer";
import PaymentInvoice from "./pages/dashboard/user/payment-invoice/payment-invoice";
import UserRecent from "./pages/dashboard/user/recents/user-recent";
import SubscriptionSettings from "./pages/dashboard/user/settings/subscription-settings";
import UserSettings from "./pages/dashboard/user/settings/user-settings";
import SubscriptionPlans from "./pages/dashboard/user/subscriptions-plans/subscription-plans";
import UserTrash from "./pages/dashboard/user/trash/user-trash";
import UserWorkspace from "./pages/dashboard/user/workspace/user-workspace";
import PublicRoute from "./components/auth/public-route";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Navigate to="/auth/login" />} path="/" />
        {/* <Route element={<HomePage />} path="/" /> */}

        {/* Auth */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />} path="/auth">
            <Route element={<SelectRolePage />} path="select-role" />
            <Route element={<LoginPage />} path="login" />
            <Route element={<SignUpPage />} path="register" />
            <Route element={<ForgotPage />} path="forgot-password" />
            <Route element={<OtpPage />} path="verify-otp" />
            <Route element={<ResetPage />} path="reset-password" />
          </Route>
        </Route>

        {/* Dashboard */}
        <Route element={<DashboardLayout />} path="/">
          {/* Admin */}
          <Route
            element={<ProtectedRoute allowedRoles={["admin"]} />}
            path="admin"
          >
            <Route element={<AdminDashboardPage />} path="dashboard" />
            <Route element={<AdminUsers />} path="users">
              <Route element={<AdminDashboardPage />} path=":id" />
            </Route>

            <Route path="developers">
              <Route element={<AdminDevelopers />} index />
              <Route element={<DeveloperDetails />} path=":id" />
            </Route>

            <Route path="projects">
              <Route element={<AdminProjects />} index />
              <Route element={<ProjectDetail />} path=":id" />
            </Route>

            <Route path="requests">
              <Route element={<AdminRequests />} index />
              <Route element={<RequestDetail />} path=":id" />
            </Route>

            <Route element={<AdminSubscription />} path="subscription" />

            <Route path="settings">
              <Route element={<AdminSettings />} index />
              <Route element={<ProfileSettings />} path="profile" />
              <Route element={<TwoFactorSettings />} path="2fa" />
              <Route element={<SecuritySettings />} path="security" />
              <Route element={<NotificationsSettings />} path="notifications" />
              <Route element={<PlatformSettings />} path="platform" />
            </Route>
          </Route>

          {/* Developer */}
          <Route
            element={<ProtectedRoute allowedRoles={["developer"]} />}
            path="developer"
          >
            <Route element={<DeveloperDashboardPage />} path="dashboard" />

            <Route path="projects">
              <Route element={<DevelopersProjects />} index />
              <Route element={<ProjectDetail />} path=":id" />
            </Route>

            <Route path="requests">
              <Route element={<DeveloperRequests />} index />
              <Route element={<RequestDetail />} path=":id" />
            </Route>

            <Route element={<DeveloperEarnings />} path="earnings" />

            <Route path="service-plans">
              <Route element={<DeveloperServicePlans />} index />
              <Route element={<CreateOffer />} path="create" />
              <Route element={<CreateOffer />} path=":id" />
            </Route>

            <Route element={<DeveloperReviews />} path="reviews" />

            <Route path="settings">
              <Route element={<DeveloperSettings />} index />
              <Route element={<DeveloperProfile />} path="profile" />
              <Route element={<TwoFactorSettings />} path="2fa" />
              <Route element={<SecuritySettings />} path="security" />
              <Route element={<NotificationsSettings />} path="notifications" />
              <Route element={<IntegrationSettings />} path="integrations" />
            </Route>

            <Route element={<DeveloperSupport />} path="support" />

            <Route element={<Chats />} path="chats" />
          </Route>
        </Route>

        {/* User Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />} path="/">
          <Route element={<UserDashboardLayout />}>
            <Route element={<UserRecent />} path="recently" />
            <Route element={<Chats />} path="messages" />

            <Route element={<UserTrash />} path="trash" />
            <Route element={<PaymentInvoice />} path="payment-invoice" />

            <Route element={<UserWorkspace />} path="workspace/:id" />

            <Route path="hire-developer">
              <Route element={<HireDeveloper />} index />
              <Route element={<DeveloperDetails />} path=":id" />
            </Route>

            <Route path="settings">
              <Route element={<UserSettings />} index />
              <Route element={<ProfileSettings />} path="profile" />
              <Route element={<TwoFactorSettings />} path="2fa" />
              <Route element={<SecuritySettings />} path="security" />
              <Route element={<NotificationsSettings />} path="notifications" />
              <Route element={<IntegrationSettings />} path="integrations" />
              <Route element={<SubscriptionSettings />} path="subscription" />
            </Route>
          </Route>
          <Route element={<CreateProjectLayout />}>
            {/* New project route */}
            <Route element={<CreateProject />} path="/create-project" />

            {/* Existing project (by ID) */}
            <Route element={<CreateProject />} path="/project/:id" />
          </Route>

          <Route element={<SubscriptionPlans />} path="subscription-plans" />
        </Route>

        {/* Landing */}
        <Route element={<LandingLayout />} path="/">
          <Route element={<HomePage />} index />
          {/* other routes */}
        </Route>

        <Route element={<SocialSuccess />} path="auth-success" />
        <Route element={<SocialError />} path="auth-error" />
      </Routes>
    </Router>
  );
}

export default App;
