import { ArrowLeft, Send } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import AddFeedbackModal from "@/components/modals/add-feedback-modal";
import CancelOfferModal from "@/components/modals/cancel-offer-modal";
import CreateOfferModal from "@/components/modals/create-offer-modal";
import DeveloperPlanModal from "@/components/modals/developer-plan-modal";
import EmojiSelector from "@/components/select/emoji-selector";
import { Icons } from "@/components/shared/icons";
import ChatWindowSkeleton from "@/components/skeletons/chat-window-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilePreview from "@/components/ui/file-preview";
import { Input } from "@/components/ui/input";
import { useWebSocketContext } from "@/contexts/websocket-context";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useGetAllThreadsList, useGetThreadDetails } from "@/hooks/use-thread";
import { useAuthStore } from "@/store/use-auth-store";
import Message from "./message";
import ThreadProjectsModal from "@/components/modals/thread-projects-modal";

const ChatWindow = memo(
  ({
    activeChatId,
    offerModalOpen,
    setOfferModalOpen,
    onBackToChats,
    className = "",
  }) => {
    const location = useLocation();
    const isMessagePage = location.pathname === "/messages";
    const user = useAuthStore((state) => state.user);
    const [cancelOfferModal, setCancelOfferModal] = useState(false);
    const [feedbackModal, setFeedbackModal] = useState(false);
    const [developerPlanModal, setDeveloperPlanModal] = useState(false);
    const [threadProjectsModal, setThreadProjectsModal] = useState(false);
    const [threadProjectType, setThreadProjectType] = useState("cancel");
    const [messageInput, setMessageInput] = useState("");

    // File upload functionality
    const {
      selectedFiles,
      uploadedFiles,
      isAnyFileUploading,
      handleFileSelect,
      removeFile,
      clearFiles,
      isFileUploading,
    } = useFileUpload();

    // Refs for auto-scroll functionality
    const messagesContainerRef = useRef(null);
    const fileInputRef = useRef(null);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

    // Get threads list to find the active thread info
    const { data: threads } = useGetAllThreadsList();

    // Get thread details for messages and status
    const {
      data: threadDetails,
      isLoading: isLoadingThreadDetails,
      refetch: refetchThreadDetails,
    } = useGetThreadDetails(activeChatId);

    // WebSocket context for sending messages
    const ws = useWebSocketContext();

    const activeThread = useMemo(
      () => threads?.find((thread) => thread.thread_id === activeChatId),
      [threads, activeChatId]
    );

    const activeMessages = useMemo(
      () => threadDetails?.messages || [],
      [threadDetails]
    );

    const threadStatus = useMemo(
      () => threadDetails?.thread_status || activeThread?.status,
      [threadDetails, activeThread]
    );

    // Listen for incoming messages via WebSocket
    useEffect(() => {
      if (ws?.lastMessage?.type === "message" && ws?.lastMessage?.data) {
        const messageData = ws.lastMessage.data;

        // Check if the message belongs to the current active thread
        if (messageData.thread === activeChatId) {
          // Refetch thread details to get the updated messages
          refetchThreadDetails();
        }
      }
    }, [ws?.lastMessage, activeChatId, refetchThreadDetails]);

    // Auto-scroll to bottom when messages change
    const scrollToBottom = useCallback(() => {
      if (messagesContainerRef.current && shouldAutoScroll) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }, [shouldAutoScroll]);

    // Scroll to bottom when messages update
    useEffect(() => {
      scrollToBottom();
    }, [activeMessages, scrollToBottom]);

    // Detect if user is scrolling manually
    const handleScroll = useCallback(() => {
      if (messagesContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          messagesContainerRef.current;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShouldAutoScroll(isAtBottom);
      }
    }, []);

    const handleDeveloperPlanModalChange = useCallback((open) => {
      setDeveloperPlanModal(open);
    }, []);

    const handleCancelOfferModalChange = useCallback((open) => {
      setCancelOfferModal(open);
    }, []);

    const handleFeedbackModalChange = useCallback((open) => {
      setFeedbackModal(open);
    }, []);

    const handleOfferModalChange = useCallback(
      (open) => {
        setOfferModalOpen(open);
      },
      [setOfferModalOpen]
    );

    const handleSendMessage = useCallback(() => {
      const trimmedMessage = messageInput.trim();
      const hasFiles = uploadedFiles.length > 0;
      const canSend = (trimmedMessage || hasFiles) && activeChatId && ws;

      if (!canSend) {
        return;
      }

      if (hasFiles) {
        // Send each uploaded file as a separate message
        for (const file of uploadedFiles) {
          const message = {
            type: "message",
            thread_id: activeChatId,
            message: trimmedMessage || "File shared",
            message_type: "file",
            attachment_url: file.attachment_url,
            attachment_name: file.attachment_name,
            attachment_size: file.attachment_size,
          };

          ws.sendRaw(message);
        }

        setMessageInput("");
        clearFiles();
      } else {
        // Send text message
        const message = {
          type: "message",
          thread_id: activeChatId,
          message: trimmedMessage,
          message_type: "text",
        };

        ws.sendRaw(message);
        setMessageInput("");
      }
    }, [messageInput, activeChatId, ws, uploadedFiles, clearFiles]);

    const handleKeyPress = useCallback(
      (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      },
      [handleSendMessage]
    );

    const handleFileInputChange = useCallback(
      (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          handleFileSelect(files);
        }
        // Reset input value to allow selecting the same file again
        e.target.value = "";
      },
      [handleFileSelect]
    );

    const handleFileIconClick = useCallback(() => {
      fileInputRef.current?.click();
    }, []);

    const handleFileRemove = useCallback(
      (index) => {
        removeFile(index);
      },
      [removeFile]
    );

    const isSendDisabled = useMemo(() => {
      const hasMessage = Boolean(messageInput.trim());
      const hasFiles = uploadedFiles.length > 0;
      const hasActiveChat = Boolean(activeChatId);
      const canSendMessage = (hasMessage || hasFiles) && hasActiveChat;
      return !canSendMessage || isAnyFileUploading;
    }, [messageInput, uploadedFiles.length, activeChatId, isAnyFileUploading]);

    const isDeveloper = user?.role === "developer";

    const renderStatusDropdown = () => {
      if (!threadStatus) {
        return null;
      }

      const statusConfig = {
        start: {
          label: "Create Offer",
          className:
            "bg-[var(--dark-blue)] px-3 py-1 text-xs shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66] sm:px-6 sm:py-2 sm:text-sm",
          items: [
            // {
            //   label: "Developer Plan",
            //   action: () => setDeveloperPlanModal(true),
            // },
            {
              label: "Create Custom Plan",
              action: () => setOfferModalOpen(true),
            },
          ],
        },

        pending: {
          label: "Pending",
          className:
            "bg-[#EAB3081A] px-2 py-1 text-[#EAB308] text-[10px] sm:px-4 sm:text-sm",
          items: [
            { label: "Create Offer", action: () => setOfferModalOpen(true) },

            ...(isDeveloper
              ? [
                  {
                    label: "Complete Project",
                    action: () => {
                      setThreadProjectsModal(true);
                      setThreadProjectType("complete");
                    },
                  },
                ]
              : []),

            {
              label: "Cancel Project",
              action: () => {
                setThreadProjectsModal(true);
                setThreadProjectType("cancel");
              },
            },
          ],
        },

        accepted: {
          label: "Active",
          className:
            "bg-[#22C55E1A] px-2 py-1 text-[#22C55E] text-[10px] sm:px-4 sm:text-sm",
          items: [
            { label: "Create Offer", action: () => setOfferModalOpen(true) },
            ...(isDeveloper
              ? [
                  {
                    label: "Complete Project",
                    action: () => {
                      setThreadProjectsModal(true);
                      setThreadProjectType("complete");
                    },
                  },
                ]
              : []),

            {
              label: "Cancel Project",
              action: () => {
                setThreadProjectsModal(true);
                setThreadProjectType("cancel");
              },
            },
          ],
        },
      };

      const config = statusConfig[threadStatus];
      if (!config) {
        return null;
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`cursor-pointer rounded-full ${config.className}`}
            >
              {config.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 cursor-pointer border border-[var(--border)] bg-black"
          >
            {config.items.map((item) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={`${threadStatus}-${item.label}`}
                onClick={item.action}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    if (isLoadingThreadDetails) {
      return <ChatWindowSkeleton />;
    }

    if (!activeThread) {
      return (
        <div
          className={`flex flex-col rounded-xl border border-[#FFFFFF1A] bg-black ${className}`}
        >
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-400">Select a chat to start messaging</p>
          </div>
        </div>
      );
    }

    const userId =
      user?.role === "developer" ? threadDetails?.sender_id : user?.id;

    return (
      <div
        className={`flex flex-col rounded-xl border border-[#FFFFFF1A] bg-black ${className}`}
      >
        <div className="flex items-center justify-between gap-2 border-[#FFFFFF1A] border-b p-2 sm:gap-3 sm:p-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:hidden"
              onClick={onBackToChats}
              type="button"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <Avatar className="h-8 w-8 flex-shrink-0 sm:h-10 sm:w-10">
              <AvatarImage
                className="object-cover"
                src={threadDetails?.profile_image}
              />
              <AvatarFallback>
                {threadDetails?.sender_full_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-medium text-sm text-white sm:text-base">
                {threadDetails?.sender_full_name}
              </span>
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center gap-1 sm:gap-3">
            {renderStatusDropdown()}

            {isMessagePage && threadStatus === "completed" && (
              <PrimaryButton
                className="h-10 rounded-full bg-[var(--light-blue)] px-2 text-xs sm:px-8 sm:text-sm"
                onClick={() => setFeedbackModal(true)}
                title="Add Feedback"
              />
            )}
          </div>
        </div>

        <div
          className="hide-scrollbar flex-1 overflow-y-auto bg-[var(--background)] p-2 sm:p-4"
          onScroll={handleScroll}
          ref={messagesContainerRef}
          style={{ maxHeight: "calc(100vh - 18rem)" }}
        >
          <div className="space-y-3">
            {activeMessages.map((msg) => (
              <Message key={msg.id} msg={msg} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 rounded-b-xl border-[#FFFFFF1A] border-t bg-white/5 p-2 sm:gap-2 sm:p-4">
          {/* File Previews */}
          {(selectedFiles.length > 0 || uploadedFiles.length > 0) && (
            <div className="mb-3 flex flex-wrap gap-2">
              {/* Show selected files that are still uploading */}
              {selectedFiles.map((file, index) => (
                <FilePreview
                  file={file}
                  isUploading={isFileUploading(file)}
                  key={`selected-${file.name}-${index}`}
                  onRemove={() => handleFileRemove(index)}
                />
              ))}
              {/* Show uploaded files */}
              {uploadedFiles.map((file, index) => (
                <FilePreview
                  file={file}
                  isUploading={false}
                  key={`uploaded-${file.attachment_name}-${index}`}
                  // Uploaded files can be removed from preview list if needed
                  onRemove={() => removeFile(index)}
                />
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Icons.File
                className="-translate-y-1/2 absolute top-1/2 left-2 h-4 w-4 cursor-pointer text-gray-400 transition-colors hover:text-white sm:left-3 sm:h-5 sm:w-5"
                onClick={handleFileIconClick}
              />

              <Input
                className="w-full rounded-md border-transparent bg-black py-1 pr-8 pl-8 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 sm:py-2 sm:pr-10 sm:pl-10"
                disabled={!activeChatId}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                value={messageInput}
              />

              <EmojiSelector
                onSelect={(emoji) => {
                  setMessageInput(messageInput + emoji);
                }}
              />
            </div>

            <Button
              className="rounded-md bg-black"
              disabled={isSendDisabled}
              onClick={handleSendMessage}
              size="icon"
            >
              <Send className="h-4 w-4 text-[var(--text)] sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          accept="image/*,application/pdf,.doc,.docx,.txt,.xls,.xlsx,.csv,video/*,audio/*,.zip,.rar,.json,.js,.ts,.tsx,.jsx,.py,.java,.cpp,.c,.html,.css"
          className="hidden"
          multiple
          onChange={handleFileInputChange}
          ref={fileInputRef}
          type="file"
        />

        <CreateOfferModal
          onOpenChange={handleOfferModalChange}
          open={offerModalOpen}
          threadId={threadDetails?.thread_id}
          userId={userId}
        />
        <CancelOfferModal
          onOpenChange={handleCancelOfferModalChange}
          open={cancelOfferModal}
        />
        <AddFeedbackModal
          onOpenChange={handleFeedbackModalChange}
          open={feedbackModal}
        />
        <DeveloperPlanModal
          onOpenChange={handleDeveloperPlanModalChange}
          open={developerPlanModal}
        />

        <ThreadProjectsModal
          onOpenChange={() => setThreadProjectsModal(false)}
          open={threadProjectsModal}
          type={threadProjectType}
          threadId={threadDetails?.thread_id}
        />
      </div>
    );
  }
);

ChatWindow.displayName = "ChatWindow";

export default ChatWindow;
