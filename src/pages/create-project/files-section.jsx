import Editor from "@monaco-editor/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFileStore } from "@/store/use-file-store";

// Recursive render for Tree
const renderTree = (elements) => {
  // Sort elements: folders first, then files
  const sortedElements = [...elements].sort((a, b) => {
    const aIsFolder = !!a.children;
    const bIsFolder = !!b.children;

    if (aIsFolder && !bIsFolder) {
      return -1;
    } // a is folder, b is file
    if (!aIsFolder && bIsFolder) {
      return 1;
    } // a is file, b is folder
    return a.name.localeCompare(b.name); // both same type, sort alphabetically
  });

  return sortedElements.map((el) =>
    el.children ? (
      <Folder element={el.name} key={el.id} value={el.id}>
        {renderTree(el.children)}
      </Folder>
    ) : (
      <File key={el.id} value={el.id}>
        {el.name}
      </File>
    )
  );
};

// Collect all folder IDs for default expanded
const collectFolderIds = (elements, ids = []) => {
  for (const el of elements) {
    if (el.children) {
      ids.push(el.id);
      collectFolderIds(el.children, ids);
    }
  }
  return ids;
};

const FilesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  // Use the shared store
  const {
    fileContents,
    activeFile,
    openFiles,
    currentElements,
    updateFileContent,
    setActiveFile,
    addOpenFile,
    removeOpenFile,
  } = useFileStore();

  const handleOpenFile = (id) => {
    addOpenFile(id);
    setActiveFile(id);
  };

  const handleEditorChange = (value) => {
    if (activeFile) {
      updateFileContent(activeFile, value);
    }
  };

  const handleCloseFile = (e, id) => {
    e.stopPropagation();
    removeOpenFile(id);
  };

  const findFile = (elements, targetId) => {
    for (const el of elements) {
      if (el.id === targetId) {
        return el;
      }
      if (el.children) {
        const found = findFile(el.children, targetId);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const getFileName = (id) => {
    const file = findFile(currentElements, id);
    return file ? file.name : null;
  };

  const getFileLanguage = (id) => {
    const fileName = getFileName(id);
    if (!fileName) {
      return "javascript";
    }

    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "tsx":
        return "typescript";
      case "jsx":
        return "javascript";
      case "ts":
        return "typescript";
      case "js":
        return "javascript";
      case "css":
        return "css";
      case "scss":
      case "sass":
        return "scss";
      case "less":
        return "less";
      case "html":
        return "html";
      case "json":
        return "json";
      case "md":
      case "markdown":
        return "markdown";
      case "xml":
        return "xml";
      case "yaml":
      case "yml":
        return "yaml";
      case "sql":
        return "sql";
      case "py":
        return "python";
      case "java":
        return "java";
      case "cpp":
      case "c":
        return "cpp";
      case "php":
        return "php";
      case "rb":
        return "ruby";
      case "go":
        return "go";
      case "rs":
        return "rust";
      case "sh":
      case "bash":
        return "shell";
      case "dockerfile":
        return "dockerfile";
      default:
        return "javascript";
    }
  };

  // Filter files based on search query
  const filteredElements = useMemo(() => {
    if (!searchQuery.trim()) {
      return currentElements;
    }

    const filterElements = (elements) =>
      elements
        .filter((el) => {
          if (el.children) {
            const filteredChildren = filterElements(el.children);
            if (filteredChildren.length > 0) {
              return {
                ...el,
                children: filteredChildren,
              };
            }
            return el.name.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return el.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .map((el) => {
          if (el.children) {
            return {
              ...el,
              children: filterElements(el.children),
            };
          }
          return el;
        });

    return filterElements(currentElements);
  }, [searchQuery, currentElements]);

  return (
    <div className="flex h-full w-full overflow-hidden rounded-lg border border-[var(--border)] bg-white/5 pb-2 sm:pb-4">
      {/* Left file tree */}
      <div
        className={`flex flex-col border-[var(--border)] border-r ${
          isMobile ? "w-1/2" : "w-1/3 sm:w-1/4 lg:w-1/4"
        }`}
      >
        {/* Search input */}
        <div className="relative m-1 pb-0 sm:m-2">
          <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 z-10 h-4 w-4 text-gray-300 sm:left-3 sm:h-5 sm:w-5" />
          <Input
            className="rounded-full border border-white/20 bg-white/10 pl-8 text-white text-xs backdrop-blur-md placeholder:text-gray-300 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 sm:pl-10 sm:text-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            type="text"
            value={searchQuery}
          />
        </div>

        {/* Scrollable file tree */}
        <div className="mobile-file-tree flex-1 overflow-y-auto px-1 pt-2 sm:px-2 sm:pt-4">
          <Tree
            elements={filteredElements}
            initialExpandedItems={collectFolderIds(filteredElements)}
            initialSelectedId={activeFile}
            onSelect={handleOpenFile}
          >
            {renderTree(filteredElements)}
          </Tree>
        </div>
      </div>

      {/* Right editor with tabs */}
      <div
        className={`flex flex-col ${
          isMobile ? "w-1/2" : "w-2/3 sm:w-3/4 lg:w-3/4"
        }`}
      >
        {/* Tabs */}
        <div className="mobile-editor-tabs hide-scrollbar flex gap-1 overflow-x-auto border-[var(--border)] border-b bg-black/20 p-1 sm:gap-2 sm:p-2">
          {openFiles.map((id) => {
            const isActive = activeFile === id;
            return (
              <div
                className={`flex items-center whitespace-nowrap rounded-md border border-[var(--border)] px-2 py-1 sm:px-3 ${
                  isActive ? "bg-white/30 font-medium" : "bg-black/10"
                }`}
                key={id}
              >
                <button
                  className={`flex items-center gap-1 truncate text-xs sm:gap-2 sm:text-sm ${
                    isMobile ? "max-w-[80px]" : "max-w-[100px] sm:max-w-[160px]"
                  }`}
                  onClick={() => setActiveFile(id)}
                  type="button"
                >
                  <span className="truncate">{getFileName(id)}</span>
                </button>
                <button
                  className="ml-1 text-gray-400 text-xs hover:text-red-400 sm:ml-2"
                  onClick={(e) => handleCloseFile(e, id)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        {/* Editor */}
        <div className="flex-1">
          {activeFile ? (
            <Editor
              height="100%"
              language={getFileLanguage(activeFile)}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },

                fontSize: isMobile ? 12 : 12,
                automaticLayout: true,
                wordWrap: "on",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                scrollbar: {
                  vertical: "auto",
                  horizontal: "auto",
                },
                readOnly: false,
              }}
              theme="vs-dark"
              value={fileContents[activeFile] || "// Empty file"}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 text-sm">
              No file open
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilesSection;
