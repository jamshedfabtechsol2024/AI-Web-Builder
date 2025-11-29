import { Code, Eye, MessageCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PromptInputComponent from "@/components/input/prompt-input-component";
import ChatSkeleton from "@/components/skeletons/chat-skeleton";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/ai-elements/conversation";
import JsonSelector from "@/components/ui/ai-elements/json-selector";
import { Message, MessageContent } from "@/components/ui/ai-elements/message";
import { Response } from "@/components/ui/ai-elements/response";
import ModernLoader from "@/components/ui/modern-loader";
import { useProjectContext } from "@/contexts/project-context";
import { useAIChat } from "@/hooks/use-ai-chat";
import {
  useConversationHistory,
  useCurrentJson,
} from "@/hooks/use-conversation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEventStore } from "@/store/use-event-store";
import { useFileStore } from "@/store/use-file-store";
import { useToolbarStore } from "@/store/use-toolbar-store";
import {
  createAssistantMessage,
  createUserMessage,
  mergeMessages,
} from "@/utils/message-utils";
import FilesSection from "./files-section";
import PreviewSection from "./preview-section";

// Mobile Create Project Component
const MobileCreateProject = ({
  mobileView,
  handleMobileViewChange,
  isSubmitting,
  streamText,
  value,
  setValue,
  handleSubmit,
  conversationMessages,
  localMessages,
  onJsonSelect,
  activeJsonId,
  isConversationLoading,
}) => {
  const allMessages = mergeMessages(
    conversationMessages,
    localMessages,
    streamText
  );

  return (
    <div className="flex h-full w-full flex-col bg-[var(--background)]">
      {/* Mobile Navigation */}
      <div className="flex border-[var(--border)] border-b bg-[var(--background)]">
        <button
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
            mobileView === "chat"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handleMobileViewChange("chat")}
          type="button"
        >
          <MessageCircle className="h-4 w-4" />
          Chat
        </button>
        <button
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
            mobileView === "preview"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handleMobileViewChange("preview")}
          type="button"
        >
          <Eye className="h-4 w-4" />
          Preview
        </button>
        <button
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
            mobileView === "code"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handleMobileViewChange("code")}
          type="button"
        >
          <Code className="h-4 w-4" />
          Code
        </button>
      </div>

      {/* Mobile Content */}
      <div className="flex-1 overflow-hidden">
        {mobileView === "chat" && (
          <div className="flex h-full flex-col p-3 sm:p-4">
            {/* Conversation area */}
            <Conversation className="mobile-conversation min-h-0 flex-1">
              <ConversationContent className="space-y-2">
                {isConversationLoading ? (
                  <ChatSkeleton />
                ) : allMessages.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                    <div>
                      <p className="text-sm">🚀 Project Ready!</p>
                      <p className="text-xs">
                        Your React project is loaded and ready to edit!
                      </p>
                    </div>
                  </div>
                ) : (
                  allMessages.map((message) => (
                    <Message from={message.from} key={message.id}>
                      <MessageContent>
                        <div className="mb-2 flex items-center gap-4">
                          <span className="text-xs opacity-70">
                            {message.from === "user" ? "You" : "AI"}
                          </span>
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {message._streaming ? (
                          <Response
                            isUser={false}
                            status={isSubmitting ? "Thinking…" : ""}
                          >
                            {streamText}
                          </Response>
                        ) : (
                          <Response
                            className="!p-0"
                            isUser={message.from === "user"}
                          >
                            {message.content}
                          </Response>
                        )}
                        {/* Add JSON selector for assistant messages with JSON */}
                        {message.from === "assistant" && message.hasJson && (
                          <JsonSelector
                            currentJsonId={activeJsonId}
                            disabled={isSubmitting}
                            isActive={activeJsonId === message.id}
                            messages={allMessages}
                            onJsonSelect={onJsonSelect}
                          />
                        )}
                      </MessageContent>
                    </Message>
                  ))
                )}
                {isSubmitting && (
                  <Message from="assistant">
                    <MessageContent>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
                        </div>
                        <span className="text-xs opacity-70">
                          AI is thinking...
                        </span>
                      </div>
                    </MessageContent>
                  </Message>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            {/* Prompt input pinned to bottom */}
            <div className="mt-2 sm:mt-4">
              <PromptInputComponent
                disabled={isSubmitting}
                onChange={(data) => setValue(data)}
                onSubmit={handleSubmit}
                value={value}
              />
            </div>
          </div>
        )}

        {mobileView === "preview" && (
          <div className="h-full w-full">
            <PreviewSection />
          </div>
        )}

        {mobileView === "code" && (
          <div className="h-full w-full p-1 sm:p-4">
            <FilesSection />
          </div>
        )}
      </div>
    </div>
  );
};

const CreateProject = () => {
  const [value, setValue] = useState("");
  const { localMessages, setLocalMessages, setLiveProjectName } =
    useProjectContext();
  const { errorMessage, setErrorMessage } = useEventStore();
  const { id } = useParams();

  const {
    messages: streamText,
    isStreaming,
    aiJson,
    hasJsonStarted,
    projectName: streamedProjectName,
    sendMessage,
    resetStream,
  } = useAIChat(id);
  const [mobileView, setMobileView] = useState("chat");
  const { active, setActive } = useToolbarStore();
  const { loadAIProjectData, switchToJson, getActiveJsonId, clearFileStore } =
    useFileStore();

  const { messages: conversationMessages, isLoading: isConversationLoading } =
    useConversationHistory(id);
  const currentJson = useCurrentJson(id);
  const isMobile = useIsMobile();

  // Clear file store and local messages when project ID changes (switching between projects)
  useEffect(() => {
    clearFileStore();
    setLocalMessages([]);
  }, [id, clearFileStore]);

  // Load current JSON from conversation on mount
  useEffect(() => {
    if (currentJson?.files) {
      // Clear existing data first to ensure clean state
      clearFileStore();
      // Load new data immediately
      loadAIProjectData(currentJson);
      setActive("play");
    }
  }, [currentJson, loadAIProjectData, setActive, clearFileStore]);

  // Clear local messages when conversation history loads (to avoid duplicates)
  useEffect(() => {
    if (conversationMessages.length > 0) {
      setLocalMessages([]);
    }
  }, [conversationMessages.length]);

  // Update live project name when it comes from streaming
  useEffect(() => {
    if (streamedProjectName) {
      setLiveProjectName(streamedProjectName);
    }
  }, [streamedProjectName, setLiveProjectName]);

  // When AI JSON arrives from streaming, load into editor/preview
  useEffect(() => {
    if (aiJson?.files) {
      loadAIProjectData(aiJson);
      setActive("play");

      // Update the streaming assistant message with JSON data
      setLocalMessages((prev) =>
        prev.map((msg) =>
          msg._streaming && msg.from === "assistant"
            ? { ...msg, hasJson: true, generated_json: aiJson }
            : msg
        )
      );
    }
  }, [aiJson, loadAIProjectData, setActive]);

  // As soon as JSON starts streaming, show Preview with loader
  useEffect(() => {
    if (hasJsonStarted) {
      setActive("play");
    }
  }, [hasJsonStarted, setActive]);

  // Handle completion of streaming - convert streaming message to regular message
  useEffect(() => {
    if (!isStreaming && localMessages.length > 0) {
      setLocalMessages(
        (prev) =>
          prev
            .map((msg) => {
              if (msg._streaming && msg.from === "assistant") {
                // If there's no content and no JSON, remove the empty assistant message
                if (!streamText && !aiJson) {
                  return null;
                }
                return {
                  ...msg,
                  content: streamText || "",
                  _streaming: false,
                  hasJson: !!aiJson,
                  generated_json: aiJson,
                };
              }
              return msg;
            })
            .filter(Boolean) // Remove null messages
      );
    }
  }, [isStreaming, streamText, aiJson, localMessages.length]);

  // Handle mobile view changes
  const handleMobileViewChange = (view) => {
    setMobileView(view);
    if (view === "code") {
      setActive("code");
    } else if (view === "preview") {
      setActive("play");
    }
  };

  // Sync mobile view with active state on desktop
  useEffect(() => {
    if (!isMobile) {
      if (active === "code") {
        setMobileView("code");
      } else {
        setMobileView("preview");
      }
    }
  }, [active, isMobile]);

  // Handle JSON selection from conversation history
  const handleJsonSelect = useCallback(
    (messageId, jsonData) => {
      if (jsonData?.files) {
        // Clear existing data first to ensure clean state
        clearFileStore();
        // Switch to new JSON version
        switchToJson(jsonData, messageId);
        setActive("play");
      }
    },
    [switchToJson, setActive, clearFileStore]
  );

  const handleSubmit = useCallback(
    async (message) => {
      if (!message.trim() || isStreaming) {
        return;
      }

      // Reset previous stream session
      resetStream();

      // Add user message to local state (preserve existing conversation)
      const userMsg = createUserMessage(message);
      const userMsgId = userMsg.id;
      setLocalMessages((prev) => [...prev, userMsg]);

      // Placeholder assistant message that updates with stream
      const assistantMsg = createAssistantMessage(userMsgId);
      setLocalMessages((prev) => [...prev, assistantMsg]);

      setValue("");
      await sendMessage(message);
    },
    [isStreaming, resetStream, sendMessage]
  );

  useEffect(() => {
    if (errorMessage) {
      handleSubmit(errorMessage);
      setErrorMessage(null);
    }
  }, [errorMessage, handleSubmit, setErrorMessage]);

  // Cleanup file store when component unmounts
  useEffect(() => () => clearFileStore(), [clearFileStore]);

  // Mobile view render
  if (isMobile) {
    return (
      <MobileCreateProject
        activeJsonId={getActiveJsonId()}
        conversationMessages={conversationMessages}
        handleMobileViewChange={handleMobileViewChange}
        handleSubmit={handleSubmit}
        isConversationLoading={isConversationLoading}
        isSubmitting={isStreaming}
        localMessages={localMessages}
        mobileView={mobileView}
        onJsonSelect={handleJsonSelect}
        setValue={setValue}
        streamText={streamText}
        value={value}
      />
    );
  }

  const isLoading = isStreaming;
  const allMessages = mergeMessages(
    conversationMessages,
    localMessages,
    streamText
  );

  // Desktop view render
  return (
    <div className="flex h-full w-full flex-col gap-2 rounded-xl bg-[var(--background)] lg:flex-row lg:gap-0">
      {/* Left Panel (responsive width) */}
      <div className="flex h-64 w-full flex-col border-[var(--border)] border-b p-2 sm:h-80 sm:p-4 lg:h-auto lg:w-64 lg:border-r lg:border-b-0 xl:w-72 2xl:w-80">
        {/* Conversation area */}
        <Conversation className="mobile-conversation scrollbar-thin min-h-0 flex-1">
          <ConversationContent className="space-y-2">
            {isConversationLoading ? (
              <ChatSkeleton />
            ) : allMessages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                <div>
                  <p className="text-sm">🚀 Let’s Build Something New!</p>
                  <p className="text-xs">
                    Welcome to{" "}
                    <span className="text-blue-400 font-medium">Staron AI</span>{" "}
                    — your creative space starts here.
                  </p>
                </div>
              </div>
            ) : (
              allMessages.map((message) => (
                <Message from={message.from} key={message.id}>
                  <MessageContent>
                    <div className="mb-1 flex items-center gap-4">
                      <span className="text-xs opacity-70">
                        {message.from === "user" ? "You" : "AI"}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {message._streaming ? (
                      <Response
                        isUser={false}
                        status={isStreaming ? "Thinking…" : ""}
                      >
                        {streamText}
                      </Response>
                    ) : (
                      <Response isUser={message.from === "user"}>
                        {message.content}
                      </Response>
                    )}
                    {/* Add JSON selector for assistant messages with JSON */}
                    {message.from === "assistant" && message.hasJson && (
                      <JsonSelector
                        currentJsonId={getActiveJsonId()}
                        disabled={isStreaming}
                        isActive={getActiveJsonId() === message.id}
                        messages={allMessages}
                        onJsonSelect={handleJsonSelect}
                      />
                    )}
                  </MessageContent>
                </Message>
              ))
            )}
            {isStreaming && (
              <Message from="assistant">
                <MessageContent>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
                    </div>
                    <span className="text-xs opacity-70">
                      {hasJsonStarted
                        ? "Building project files…"
                        : "Generating answer…"}
                    </span>
                  </div>
                </MessageContent>
              </Message>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Prompt input pinned to bottom */}
        <div className="mt-2 sm:mt-4">
          <PromptInputComponent
            disabled={isStreaming}
            onChange={(data) => setValue(data)}
            onSubmit={handleSubmit}
            value={value}
          />
        </div>
      </div>

      {/* Right Panel (main content) */}
      <div
        className={`flex-1 overflow-hidden ${
          active === "code" ? "p-2 sm:p-4" : "p-0"
        }`}
      >
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center bg-[var(--background)]">
            <ModernLoader
              words={[
                "Thinking…",
                "Writing code…",
                "Analyzing request…",
                "Compiling ideas…",
                "Optimizing functions…",
                "Fetching data…",
                "Aligning brackets…",
                "Summoning loops…",
                "Preparing AI…",
                "Translating code…",
                "Polishing logic…",
                "Refining output…",
              ]}
            />
          </div>
        ) : active === "code" ? (
          <FilesSection />
        ) : (
          <PreviewSection />
        )}
      </div>
    </div>
  );
};

export default CreateProject;
