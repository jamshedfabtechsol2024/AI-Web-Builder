import {
  SandpackLayout,
  SandpackProvider,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useCallback, useMemo } from "react";
import ResetSandpackPreview from "@/components/sandpack/reset-sandpack-preview";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEventStore } from "@/store/use-event-store";
import { useFileStore } from "@/store/use-file-store";

const CustomErrorOverlay = () => {
  const { sandpack } = useSandpack();
  const error = sandpack?.error ?? null;
  const { resetAllFiles } = sandpack || {};
  const { setErrorMessage } = useEventStore();

  if (!error) {
    return null;
  }

  const message =
    typeof error === "string"
      ? error
      : (error?.message ?? JSON.stringify(error, null, 2));

  const handleResolve = () => {
    const formatted = `
**⚠️ Runtime Error Detected**

**Error Message:**
\`\`\`text
${message}
\`\`\`

Please analyze the error and correct the code so it runs successfully without affecting existing functionality.
`;

    // Send error message to AI for resolution
    setErrorMessage(formatted);

    try {
      if (typeof resetAllFiles === "function") {
        resetAllFiles();
      }
    } catch {
      // Silently handle reset errors
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black p-6 text-red-400">
      <h2 className="mb-2 font-semibold text-lg text-white">⚠️ Runtime Error</h2>
      <pre className="max-h-[200px] w-11/12 overflow-auto rounded-md border border-red-500/40 bg-red-950/30 p-4 text-red-300 text-sm">
        {message}
      </pre>
      <button
        className="mt-4 rounded-lg bg-red-600 px-5 py-2 font-medium text-sm text-white transition-all duration-200 hover:bg-red-500"
        onClick={handleResolve}
        type="button"
      >
        Resolve Error
      </button>
    </div>
  );
};

const PreviewSection = () => {
  const {
    fileContents,
    sandpackFiles,
    aiProjectData,
    currentElements,
    activeJsonId,
  } = useFileStore();
  const isMobile = useIsMobile();

  const customSetup = useMemo(() => {
    const baseSetup = {
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.8.0",
        "lucide-react": "^0.263.1",
        clsx: "^2.0.0",
        "date-fns": "^2.30.0",
        uuid: "^9.0.0",
        "react-markdown": "^8.0.7",
        "remark-gfm": "^3.0.1",
        "rehype-highlight": "^6.0.0",
        "highlight.js": "^11.8.0",
        tailwindcss: "^4.0.0",
      },
      devDependencies: {
        "@vitejs/plugin-react": "^4.0.3",
        eslint: "^8.45.0",
        "eslint-plugin-react": "^7.32.2",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.3",
        vite: "^4.4.5",
      },
    };

    if (aiProjectData?.files) {
      if (aiProjectData.files["src/main.jsx"]) {
        return { ...baseSetup, entry: "/src/main.jsx" };
      }
      if (aiProjectData.files["src/index.js"]) {
        return { ...baseSetup, entry: "/src/index.js" };
      }
      if (aiProjectData.files["index.js"]) {
        return { ...baseSetup, entry: "/index.js" };
      }
    }

    return { ...baseSetup, entry: "/src/main.jsx" };
  }, [aiProjectData]);

  const findFilePath = useCallback((elements, targetId, currentPath = "") => {
    for (const el of elements) {
      const fullPath = currentPath ? `${currentPath}/${el.name}` : el.name;
      if (el.id === targetId) {
        return fullPath;
      }
      if (el.children) {
        const found = findFilePath(el.children, targetId, fullPath);
        if (found) {
          return found;
        }
      }
    }
    // File path not found for ID
    return null;
  }, []);

  const filesToUse = useMemo(() => {
    const sandpackFilesData = {};

    if (aiProjectData?.files) {
      for (const [filePath, content] of Object.entries(aiProjectData.files)) {
        sandpackFilesData[`/${filePath}`] = { code: content, readOnly: false };
      }
    }

    for (const [fileId, content] of Object.entries(fileContents)) {
      const filePath = findFilePath(currentElements, fileId);
      if (filePath) {
        sandpackFilesData[`/${filePath}`] = { code: content, readOnly: false };
      } else {
        // Skip file with ID - path not found
      }
    }

    if (Object.keys(sandpackFilesData).length === 0) {
      return sandpackFiles();
    }

    return sandpackFilesData;
  }, [
    aiProjectData,
    fileContents,
    currentElements,
    sandpackFiles,
    findFilePath,
  ]);

  const previewHeight = isMobile
    ? "calc(100vh - 140px)"
    : "calc(100vh - 100px)";

  // Debug: aiProjectData loaded

  // Create a more robust key that includes both activeJsonId and file content hash
  const sandpackKey = useMemo(() => {
    const contentHash = JSON.stringify(filesToUse).slice(0, 50);
    return `sandpack-${activeJsonId || "default"}-${contentHash}`;
  }, [activeJsonId, filesToUse]);

  return (
    <div className="h-full w-full">
      <SandpackProvider
        customSetup={customSetup}
        files={filesToUse}
        key={sandpackKey}
        options={{
          showNavigator: !isMobile,
          showRefreshButton: true,
          wrapContent: true,
          bundlerTimeout: 30_000,
          recompileMode: "delayed",
          recompileDelay: 300,
          showConsole: false,
          showConsoleButton: false,
          showTabs: !isMobile,
          closableTabs: false,
          initMode: "lazy",
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        template="react"
        theme="dark"
      >
        <SandpackLayout>
          <div
            className="relative w-full"
            style={{
              height: previewHeight,
              minHeight: isMobile ? "calc(100vh - 140px)" : "300px",
            }}
          >
            {/* Base black background to fully cover red overlay */}
            <div className="absolute inset-0 z-0 bg-black" />

            <ResetSandpackPreview
              activeJsonId={activeJsonId}
              className="relative z-10"
              showNavigator={!isMobile}
              showOpenInCodeSandbox={false}
              showRefreshButton
              showSandpackErrorOverlay={false} // disables red overlay
              style={{
                height: "100%",
                borderRadius: "0.5rem",
              }}
            >
              {/* Custom error overlay rendered on top */}
              <CustomErrorOverlay />
            </ResetSandpackPreview>
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default PreviewSection;
