import { useEffect } from "react";
import { useWebSocketContext } from "@/contexts/websocket-context";

export const useWebSocket = (messageType, handler) => {
  const ctx = useWebSocketContext();

  useEffect(() => {
    if (!ctx || !handler) return undefined;
    const onMessage = (event) => {
      if (!event || typeof event !== "object") return;
      const { type } = event;
      if (type === messageType) {
        handler(event);
      }
    };
    // Lightweight subscription via checking ctx.lastMessage
    let lastProcessedTs = 0;
    const intervalId = setInterval(() => {
      const msg = ctx.lastMessage;
      if (!msg) return;
      const ts = typeof msg?.ts === "number" ? msg.ts : 0;
      if (ts && ts <= lastProcessedTs) return;
      lastProcessedTs = ts;
      onMessage(msg);
    }, 250);
    return () => {
      clearInterval(intervalId);
    };
  }, [ctx, messageType, handler]);

  return ctx;
};


