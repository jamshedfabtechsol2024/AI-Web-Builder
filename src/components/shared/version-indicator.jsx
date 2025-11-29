import { memo } from "react";

/**
 * VersionIndicator - Shows current version number and total versions
 */
const VersionIndicator = memo(
  ({ currentVersion, totalVersions, isLoading }) => {
    if (isLoading) {
      return (
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <div className="h-2 w-2 animate-pulse rounded-full bg-current" />
          <span>Loading...</span>
        </div>
      );
    }

    if (totalVersions === 0) {
      return null;
    }

    return (
      <div className="flex items-center gap-1 text-muted-foreground text-xs">
        <span>Version {currentVersion}</span>
        <span>of {totalVersions}</span>
      </div>
    );
  }
);

VersionIndicator.displayName = "VersionIndicator";

export default VersionIndicator;
