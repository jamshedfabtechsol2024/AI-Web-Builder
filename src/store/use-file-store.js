import { create } from "zustand";

// Convert AI project data to file structure format
const convertAIProjectToFileStructure = (aiProjectData) => {
  if (!aiProjectData?.files) {
    return []; // return empty array if no AI data
  }

  const { files } = aiProjectData;
  let idCounter = 1;

  // Helper function to create file element
  const createFileElement = (name, content) => ({
    id: (idCounter++).toString(),
    name,
    content,
  });

  // Helper function to create folder element
  const createFolderElement = (name, children) => ({
    id: (idCounter++).toString(),
    name,
    children,
  });

  // Build a tree structure from file paths
  const buildTree = (entries) => {
    const tree = {};

    for (const [filePath, content] of entries) {
      const parts = filePath.split("/");
      let current = tree;

      // Navigate/create the folder structure
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = { type: "folder", children: {} };
        }
        current = current[part].children;
      }

      // Add the file
      const fileName = parts.at(-1);
      current[fileName] = { type: "file", content };
    }

    return tree;
  };

  // Convert tree to elements array
  const convertTreeToElements = (treeStructure) => {
    const elements = [];

    for (const [name, node] of Object.entries(treeStructure)) {
      if (node.type === "file") {
        elements.push(createFileElement(name, node.content));
      } else if (node.type === "folder") {
        const children = convertTreeToElements(node.children);
        elements.push(createFolderElement(name, children));
      }
    }

    return elements;
  };

  const fileEntries = Object.entries(files);
  const tree = buildTree(fileEntries);
  return convertTreeToElements(tree);
};

export const useFileStore = create((set, get) => ({
  // AI project data state
  aiProjectData: null,

  // Current active JSON ID (for tracking which message's JSON is active)
  activeJsonId: null,

  // Current file structure (starts empty, will be populated with AI data)
  currentElements: [],

  // File contents state (starts empty, will be populated with AI data)
  fileContents: {},

  // Active file state
  activeFile: null,

  // Open files state
  openFiles: [],

  // Actions
  updateFileContent: (fileId, content) =>
    set((state) => ({
      fileContents: {
        ...state.fileContents,
        [fileId]: content,
      },
    })),

  setActiveFile: (fileId) => set({ activeFile: fileId }),

  addOpenFile: (fileId) =>
    set((state) => ({
      openFiles: state.openFiles.includes(fileId)
        ? state.openFiles
        : [...state.openFiles, fileId],
    })),

  removeOpenFile: (fileId) =>
    set((state) => {
      const newOpenFiles = state.openFiles.filter((id) => id !== fileId);
      let newActiveFile = state.activeFile;
      if (state.activeFile === fileId) {
        if (newOpenFiles.length > 0) {
          newActiveFile = newOpenFiles.at(-1);
        } else {
          newActiveFile = null;
        }
      }

      return {
        openFiles: newOpenFiles,
        activeFile: newActiveFile,
      };
    }),

  // Load AI project data
  loadAIProjectData: (aiProjectData, jsonId = null) => {
    if (!aiProjectData?.files) {
      return;
    }

    const newElements = convertAIProjectToFileStructure(aiProjectData);

    // Initialize file contents from new elements
    const newFileContents = {};
    const fill = (elements) => {
      for (const el of elements) {
        if (el.content) {
          newFileContents[el.id] = el.content;
        }
        if (el.children) {
          fill(el.children);
        }
      }
    };
    fill(newElements);

    // Set first file as active if available
    const firstFile =
      newElements.find((el) => el.content) || newElements[0]?.children?.[0];
    const firstFileId = firstFile?.id;

    set({
      aiProjectData,
      activeJsonId: jsonId,
      currentElements: newElements,
      fileContents: newFileContents,
      activeFile: firstFileId || null,
      openFiles: firstFileId ? [firstFileId] : [],
    });
  },

  // Switch to a different JSON version
  switchToJson: (aiProjectData, jsonId) => {
    // Force complete reset by clearing current state first
    set({
      aiProjectData: null,
      activeJsonId: null,
      currentElements: [],
      fileContents: {},
      activeFile: null,
      openFiles: [],
    });

    // Load new data immediately to ensure proper synchronization
    get().loadAIProjectData(aiProjectData, jsonId);
  },

  // Get current active JSON ID
  getActiveJsonId: () => get().activeJsonId,

  // Clear all file store data (useful when switching projects)
  clearFileStore: () => {
    set({
      aiProjectData: null,
      activeJsonId: null,
      currentElements: [],
      fileContents: {},
      activeFile: null,
      openFiles: [],
    });
  },

  // Helper function to create file path for Sandpack
  _createFilePath: (element, parentPath) => {
    let filePath = element.name;

    if (parentPath === "src") {
      filePath = element.name;
    } else if (parentPath.startsWith("src/")) {
      filePath = `${parentPath.replace("src/", "")}/${element.name}`;
    } else if (parentPath) {
      filePath = `${parentPath}/${element.name}`;
    }

    if (element.name === "package.json" || element.name === "public") {
      filePath = parentPath ? `${parentPath}/${element.name}` : element.name;
    }

    return filePath;
  },

  // Helper function to process elements
  _processElement: (element, parentPath, fileContents) => {
    const files = {};

    // Only process files that have content
    if (element.content !== undefined && element.content !== null) {
      const filePath = get()._createFilePath(element, parentPath);
      files[filePath] = {
        code: fileContents[element.id] || element.content || "",
        readOnly: false,
      };
    }

    // Process children recursively
    if (element.children && element.children.length > 0) {
      const currentPath = parentPath
        ? `${parentPath}/${element.name}`
        : element.name;
      for (const child of element.children) {
        const childFiles = get()._processElement(
          child,
          currentPath,
          fileContents
        );
        Object.assign(files, childFiles);
      }
    }

    return files;
  },

  // Get Sandpack files format
  getSandpackFiles: () => {
    const { fileContents, _processElement, currentElements } = get();
    const files = {};

    for (const element of currentElements) {
      const elementFiles = _processElement(element, "", fileContents);
      Object.assign(files, elementFiles);
    }

    return files;
  },

  // Computed sandpack files that updates when fileContents change
  sandpackFiles: () => {
    const { fileContents, _processElement, currentElements } = get();
    const files = {};

    for (const element of currentElements) {
      const elementFiles = _processElement(element, "", fileContents);
      Object.assign(files, elementFiles);
    }

    return files;
  },
}));
