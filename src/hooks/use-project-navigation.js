import { useCallback, useMemo } from "react";
import { useProjectContext } from "@/contexts/project-context";
import { useFileStore } from "@/store/use-file-store";
import { useToolbarStore } from "@/store/use-toolbar-store";
import { useConversationHistory } from "./use-conversation";

/**
 * Custom hook for project navigation functionality
 * Handles version switching, project name display, and navigation state
 */
export const useProjectNavigation = (projectId, liveProjectName = null) => {
  const { messages, isLoading, conversationData } =
    useConversationHistory(projectId);
  const { localMessages } = useProjectContext();
  const { switchToJson, getActiveJsonId, clearFileStore } = useFileStore();
  const { setActive } = useToolbarStore();
  const conversation_id = conversationData?.conversation_id;
  const { project_repo_info } = conversationData || {};

  // Merge conversation messages with local messages to get all versions
  const allMessages = useMemo(() => {
    const localWithJson = localMessages.filter((message) => message.hasJson);
    return [...messages, ...localWithJson];
  }, [messages, localMessages]);

  // Get messages that have JSON data (versions)
  const versionsWithJson = useMemo(
    () => allMessages.filter((message) => message.hasJson),
    [allMessages]
  );

  // Get current active version index
  const currentVersionIndex = useMemo(() => {
    const activeJsonId = getActiveJsonId();

    // If no active JSON ID is set, default to the latest version (last index)
    if (!activeJsonId) {
      return versionsWithJson.length > 0 ? versionsWithJson.length - 1 : -1;
    }

    // Find the index of the active version
    const index = versionsWithJson.findIndex(
      (version) => version.id === activeJsonId
    );

    // If not found, default to the latest version
    return index >= 0 ? index : versionsWithJson.length - 1;
  }, [versionsWithJson, getActiveJsonId]);

  // Get project name with live updates priority
  const projectName = useMemo(() => {
    // First priority: Live project name from streaming (most recent)
    if (liveProjectName) {
      const name = liveProjectName;
      // Truncate if too long for UI
      return name.length > 30 ? `${name.slice(0, 27)}...` : name;
    }

    // Second priority: Project name from conversation data
    if (conversationData?.project_name) {
      const name = conversationData.project_name;
      // Truncate if too long for UI
      return name.length > 30 ? `${name.slice(0, 27)}...` : name;
    }

    // Fallback: Extract project name from first user message (check all messages)
    const firstMessage = allMessages.find((msg) => msg.from === "user");
    if (firstMessage?.content) {
      const content = firstMessage.content;
      if (content.length > 30) {
        return `${content.slice(0, 27)}...`;
      }
      return content;
    }

    return "Project Name";
  }, [liveProjectName, conversationData, allMessages]);

  // Provide untruncated name for forms
  const raw_project_name = useMemo(() => {
    if (liveProjectName) return liveProjectName;
    if (conversationData?.project_name) return conversationData.project_name;
    const firstMessage = allMessages.find((msg) => msg.from === "user");
    return firstMessage?.content || "";
  }, [liveProjectName, conversationData, allMessages]);

  // Navigation functions with error handling
  const goToPreviousVersion = useCallback(() => {
    try {
      if (currentVersionIndex > 0) {
        const previousVersion = versionsWithJson[currentVersionIndex - 1];
        if (previousVersion?.generated_json) {
          clearFileStore();
          switchToJson(previousVersion.generated_json, previousVersion.id);
          setActive("play");
        }
      }
    } catch {
      // Error handling for navigation
    }
  }, [
    currentVersionIndex,
    versionsWithJson,
    switchToJson,
    setActive,
    clearFileStore,
  ]);

  const goToNextVersion = useCallback(() => {
    try {
      if (currentVersionIndex < versionsWithJson.length - 1) {
        const nextVersion = versionsWithJson[currentVersionIndex + 1];
        if (nextVersion?.generated_json) {
          clearFileStore();
          switchToJson(nextVersion.generated_json, nextVersion.id);
          setActive("play");
        }
      }
    } catch {
      // Error handling for navigation
    }
  }, [
    currentVersionIndex,
    versionsWithJson,
    switchToJson,
    setActive,
    clearFileStore,
  ]);

  const goToVersion = useCallback(
    (versionId) => {
      try {
        const version = versionsWithJson.find((v) => v.id === versionId);
        if (version?.generated_json) {
          clearFileStore();
          switchToJson(version.generated_json, version.id);
          setActive("play");
        }
      } catch {
        // Error handling for navigation
      }
    },
    [versionsWithJson, switchToJson, setActive, clearFileStore]
  );

  // Navigation state
  const canGoPrevious = currentVersionIndex > 0;
  const canGoNext = currentVersionIndex < versionsWithJson.length - 1;
  const totalVersions = versionsWithJson.length;
  const currentVersionNumber =
    currentVersionIndex >= 0 ? currentVersionIndex + 1 : 0;

  return {
    // Project info
    conversation_id,
    projectName,
    raw_project_name,
    project_repo_info,
    isLoading,

    // Version data
    versions: versionsWithJson,
    currentVersionIndex,
    currentVersionNumber,
    totalVersions,

    // Navigation state
    canGoPrevious,
    canGoNext,

    // Navigation functions
    goToPreviousVersion,
    goToNextVersion,
    goToVersion,
  };
};
