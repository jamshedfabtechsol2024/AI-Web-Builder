import { useSandpack } from "@codesandbox/sandpack-react";
import { useEffect, useRef } from "react";

/**
 * Custom hook to reset Sandpack to default route when JSON version changes
 * @param {string} activeJsonId - The current active JSON ID
 */
export const useSandpackReset = (activeJsonId) => {
  const { sandpack } = useSandpack();
  const previousJsonIdRef = useRef(activeJsonId);

  useEffect(() => {
    // Only reset if the JSON ID actually changed
    if (previousJsonIdRef.current !== activeJsonId) {
      previousJsonIdRef.current = activeJsonId;

      // Reset Sandpack to default route
      if (sandpack?.resetAllFiles) {
        // Small delay to ensure the new files are loaded
        setTimeout(() => {
          try {
            sandpack.resetAllFiles();
          } catch {
            // Silently handle reset errors
          }
        }, 100);
      }
    }
  }, [activeJsonId, sandpack]);
};
