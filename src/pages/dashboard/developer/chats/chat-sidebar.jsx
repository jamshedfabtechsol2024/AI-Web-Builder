import { Ellipsis, Search, X } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import ChatSidebarSkeleton from "@/components/skeletons/chat-sidebar-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useWebSocketContext } from "@/contexts/websocket-context";
import { useGetAllThreadsList } from "@/hooks/use-thread";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounceSearch } from "@/hooks/use-debounce-search";

const ChatSidebar = memo(({ activeChatId, setActiveChatId }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { value, debouncedValue, setValue } = useDebounceSearch("");
  const {
    data: threads,
    isLoading,
    refetch,
  } = useGetAllThreadsList({
    search: debouncedValue,
  });

  const ws = useWebSocketContext();

  // Refetch threads when a new thread is created
  useEffect(() => {
    if (ws?.lastMessage?.type === "init" && ws?.lastMessage?.thread_id) {
      refetch();
    }
  }, [ws?.lastMessage, refetch]);

  // Listen for incoming messages via WebSocket
  useEffect(() => {
    if (ws?.lastMessage?.type === "message" && ws?.lastMessage?.data) {
      refetch();
    }
  }, [ws?.lastMessage, refetch]);

  const handleChatSelect = useCallback(
    (threadId) => {
      setActiveChatId(threadId);
    },
    [setActiveChatId]
  );

  const handleKeyDown = useCallback(
    (e, threadId) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleChatSelect(threadId);
      }
    },
    [handleChatSelect]
  );

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <>
      <div className="flex h-full min-h-0 flex-col rounded-xl border border-[#FFFFFF1A] bg-black p-2 sm:p-4">
        <div className="mb-3 flex flex-row items-center justify-between border-b border-[#FFFFFF1A] pb-2 sm:mb-4 sm:pb-3 relative">
          {/* Title */}
          {!showSearch && (
            <h2 className="font-semibold text-base text-white sm:text-lg">
              Chats
            </h2>
          )}

          {/* Search Section */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  key="search"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{ originX: 1 }}
                  className="relative flex-1"
                >
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search Here"
                    className="w-full rounded-full bg-[#ffffff1a] px-4 py-2 text-sm text-white outline-none placeholder:text-gray-400 focus:bg-[#ffffff26] shadow-md"
                    autoFocus
                  />

                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setValue("");
                    }}
                    className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-gray-300 hover:text-white transition"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Icon (visible only when input hidden) */}
            {!showSearch && (
              <button
                onClick={() => setShowSearch(true)}
                className="text-gray-300 cursor-pointer hover:text-white transition"
              >
                <Search size={18} />
              </button>
            )}
          </div>
        </div>
        {isLoading ? (
          <ChatSidebarSkeleton />
        ) : (
          <div className="hide-scrollbar min-h-0 w-full flex-1 space-y-1 overflow-y-auto sm:space-y-2">
            {threads && threads.length > 0 ? (
              threads?.map((thread) => {
                const isActive = thread.thread_id === activeChatId;
                return (
                  <button
                    aria-pressed={isActive}
                    className={`relative flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors sm:gap-3 sm:p-3 ${
                      isActive
                        ? "border border-white/10 bg-white/5"
                        : "hover:bg-white/5"
                    }`}
                    key={thread.thread_id}
                    onClick={() => handleChatSelect(thread.thread_id)}
                    onKeyDown={(e) => handleKeyDown(e, thread.thread_id)}
                    type="button"
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0 sm:h-10 sm:w-10">
                      <AvatarImage
                        className="object-cover"
                        src={thread.avatar}
                      />
                      <AvatarFallback>{thread.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex min-w-0 flex-1 flex-col items-start overflow-hidden">
                      <span className="truncate font-medium text-[var(--text)] text-xs sm:text-sm">
                        {thread.name}
                      </span>
                      <span className="block w-full truncate text-start text-[10px] text-[var(--text)] sm:text-xs">
                        {thread.lastMessage || "No messages yet"}
                      </span>
                    </div>

                    <div className="absolute top-1 right-2 flex flex-col items-end gap-1 sm:top-2 sm:right-3">
                      <span className="text-[9px] text-[var(--text)] sm:text-[11px]">
                        {formatTime(thread.time)}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[var(--text)] text-sm opacity-70">
                No Chat
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
});

ChatSidebar.displayName = "ChatSidebar";

export default ChatSidebar;
