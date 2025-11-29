import SocialButton from "@/components/buttons/social-button";
import { Icons } from "@/components/shared/icons";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConnectGitHubMutation, useMeQuery } from "@/hooks/use-auth";

const IntegrationSettings = () => {
  const { data: user, isLoading } = useMeQuery();

  const { mutate: connectGitHub, isPending: isConnectingGitHub } =
    useConnectGitHubMutation();

  const isGitHubConnected =
    user?.github_connected && user?.github_status === "connected";
  const githubUsername = user?.github_username;

  if (isLoading) {
    return (
      <div>
        <h1 className="mb-2 border-white/10 border-b pb-2 font-medium text-lg">
          Integration Settings
        </h1>

        <Card className="border border-[#FFFFFF0F] bg-[#FFFFFF0F] p-4">
          {/* Header Section Skeleton */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>

          {/* Body Section Skeleton */}
          <div className="mt-4 flex flex-col items-center justify-center gap-4 text-center">
            <Skeleton className="h-4 w-80" />
            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 border-white/10 border-b pb-2 font-medium text-lg">
        Integration Settings
      </h1>

      <Card className="border border-[#FFFFFF0F] bg-[#FFFFFF0F] p-4">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* GitHub Info */}
          <div className="flex items-center gap-2">
            <Icons.Github className="h-12 w-12 shrink-0" />
            <div>
              <h2 className="font-semibold text-lg">GitHub</h2>
              <p className="text-gray-400 text-xs lg:text-sm 2xl:text-base">
                {isGitHubConnected
                  ? `Connected as @${githubUsername}`
                  : "Connect your GitHub account to your project"}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div
            className={`w-fit rounded-full border px-4 py-1 text-sm ${
              isGitHubConnected
                ? "border-[#10B981] bg-[#10B9811A] text-[#10B981]"
                : "border-[#D80004] bg-[#D800041A] text-[#D80004]"
            }`}
          >
            {isGitHubConnected ? "Connected" : "Not Connected"}
          </div>
        </div>

        {/* Body Section */}
        {!isGitHubConnected && (
          <div className="mt-4 flex flex-col items-center justify-center gap-4 text-center">
            <p className="max-w-md text-gray-400 text-xs sm:text-sm 2xl:text-sm">
              Connect your GitHub account to access your repositories and enable
              automatic syncing.
            </p>

            <SocialButton
              className="!px-10 w-full rounded-xl border border-transparent bg-[var(--light-blue)] py-2 sm:w-auto"
              icon={<Icons.Github className="!h-6 !w-6" />}
              loading={isConnectingGitHub}
              onClick={() => connectGitHub()}
              title="Connect with GitHub"
            />
          </div>
        )}

        {/* Connected State */}
        {isGitHubConnected && (
          <div className="mt-4 flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2 text-green-400">
              <Icons.Done className="h-5 w-5" />
              <p className="font-medium text-sm">
                Successfully connected to GitHub
              </p>
            </div>
            <p className="max-w-md text-gray-400 text-xs sm:text-sm 2xl:text-sm">
              Your GitHub account is now connected. You can access your
              repositories and enable automatic syncing.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default IntegrationSettings;
