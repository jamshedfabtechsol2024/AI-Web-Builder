import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    // Return default values if not within provider (for backward compatibility)
    return {
      localMessages: [],
      setLocalMessages: () => {
        // No-op function for backward compatibility
      },
      liveProjectName: null,
      setLiveProjectName: () => {
        // No-op function for backward compatibility
      },
    };
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [localMessages, setLocalMessages] = useState([]);
  const [liveProjectName, setLiveProjectName] = useState(null);

  const value = {
    localMessages,
    setLocalMessages,
    liveProjectName,
    setLiveProjectName,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
