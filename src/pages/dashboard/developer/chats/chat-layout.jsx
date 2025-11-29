import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ChatSidebar from "./chat-sidebar";
import ChatWindow from "./chat-window";

const ChatLayout = () => {
  const [searchParams] = useSearchParams();
  const [activeChatId, setActiveChatId] = useState(null);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  // Get thread_id from URL params
  const threadIdFromUrl = searchParams.get("thread");

  // Set active chat from URL params on mount
  useEffect(() => {
    if (threadIdFromUrl) {
      setActiveChatId(threadIdFromUrl);
    }
  }, [threadIdFromUrl]);

  const handleChatSelect = useCallback((threadId) => {
    setActiveChatId(threadId);
  }, []);

  const handleBackToChats = useCallback(() => {
    setActiveChatId(null);
  }, []);

  const handleOfferModalChange = useCallback((open) => {
    setOfferModalOpen(open);
  }, []);

  const showSidebar = !activeChatId || window.innerWidth >= 1024;
  const showChatWindow = activeChatId || window.innerWidth >= 1024;

  return (
    <div className="h-[calc(100vh-9rem)] p-2 lg:grid lg:grid-cols-[300px_1fr] lg:gap-4">
      <div className={`h-full ${showSidebar ? "block" : "hidden"}`}>
        <ChatSidebar
          activeChatId={activeChatId}
          className="h-full"
          setActiveChatId={handleChatSelect}
        />
      </div>

      <div className={`h-full ${showChatWindow ? "block" : "hidden"}`}>
        <ChatWindow
          activeChatId={activeChatId}
          className="h-full"
          offerModalOpen={offerModalOpen}
          onBackToChats={handleBackToChats}
          setOfferModalOpen={handleOfferModalChange}
        />
      </div>
    </div>
  );
};

export default ChatLayout;
