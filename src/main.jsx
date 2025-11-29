import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import App from "./app.jsx";
import { getQueryClient } from "./lib/query-client";
import { WebSocketProvider } from "@/contexts/websocket-context";

const queryClient = getQueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
      {import.meta.env.MODE !== "production" ? (
        <ReactQueryDevtools
          buttonPosition="bottom-right"
          initialIsOpen={false}
        />
      ) : null}
    </QueryClientProvider>
  </React.StrictMode>
);
