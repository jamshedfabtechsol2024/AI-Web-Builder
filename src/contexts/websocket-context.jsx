import { createContext, useContext, useEffect, useMemo } from "react";
import useWebSocket from "react-use-websocket";
import { useAuthStore } from "@/store/use-auth-store";
import { useWebSocketStore } from "@/store/use-websocket-store";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const setReadyState = useWebSocketStore((s) => s.setReadyState);
  const setIsConnected = useWebSocketStore((s) => s.setIsConnected);
  const setLastMessageTs = useWebSocketStore((s) => s.setLastMessageTs);
  const setLoadingAction = useWebSocketStore((s) => s.setLoadingAction);
  const clearLoadingAction = useWebSocketStore((s) => s.clearLoadingAction);

  const wsUrl = useMemo(() => {
    const base = import.meta.env.VITE_WS_URL;
    if (!base) {
      return null;
    }
    if (!isAuthenticated) {
      return null;
    }
    if (!accessToken) {
      return null;
    }
    const url = new URL(base);
    url.searchParams.set("token", accessToken);
    return url.toString();
  }, [accessToken, isAuthenticated]);

  const { sendJsonMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket(
      wsUrl,
      {
        share: true,
        filter: () => true,
        shouldReconnect: () => true,
        reconnectAttempts: Number.POSITIVE_INFINITY,
        reconnectInterval: (attemptNumber) => {
          const base = 500 * 2 ** Math.min(attemptNumber, 5);
          const jitter = Math.floor(Math.random() * 200);
          return Math.min(base + jitter, 30_000);
        },
        onOpen: () => {
          setIsConnected(true);
        },
        onClose: () => {
          setIsConnected(false);
        },
        onError: () => {
          setIsConnected(false);
        },
      },
      isAuthenticated && Boolean(wsUrl)
    );

  useEffect(() => {
    setReadyState(readyState);
  }, [readyState, setReadyState]);

  useEffect(() => {
    if (lastJsonMessage) {
      setLastMessageTs(Date.now());

      // Clear loading for any action that receives a response
      if (lastJsonMessage.type) {
        clearLoadingAction(lastJsonMessage.type);
      }
    }
  }, [lastJsonMessage, setLastMessageTs, clearLoadingAction]);

  useEffect(() => {
    const socket = getWebSocket();
    if (!socket) {
      return;
    }
    const intervalId = setInterval(() => {
      try {
        sendJsonMessage({ type: "ping", ts: Date.now() });
      } catch {
        // ignore
      }
    }, 30_000);
    return () => {
      clearInterval(intervalId);
    };
  }, [getWebSocket, sendJsonMessage]);

  const value = useMemo(
    () => ({
      send: (type, payload) => {
        setLoadingAction(type, true);
        sendJsonMessage({ type, payload });
      },
      sendRaw: (message) => {
        // Sends exactly what is provided without additional envelope
        if (message.type) {
          setLoadingAction(message.type, true);
        }
        sendJsonMessage(message);
      },
      lastMessage: lastJsonMessage,
      readyState,
      getWebSocket,
    }),
    [
      getWebSocket,
      lastJsonMessage,
      readyState,
      sendJsonMessage,
      setLoadingAction,
    ]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const ctx = useContext(WebSocketContext);
  return ctx;
};
