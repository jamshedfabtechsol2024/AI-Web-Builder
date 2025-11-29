// api/ai-chat.js

import Cookies from "js-cookie";
import aiClient from "./ai-client";

// Regex patterns defined at top level for performance
const LINE_BREAK_REGEX = /\r?\n/;
const DATA_PREFIX_REGEX = /^data:\s?/;
const BLANK_LINE_REGEX = /\r?\n\r?\n/;

// Helper function to extract data lines from block
const extractDataLines = (block) => {
  const lines = block.split(LINE_BREAK_REGEX);
  const dataLines = [];

  for (const l of lines) {
    if (l.startsWith("data:")) {
      dataLines.push(l.replace(DATA_PREFIX_REGEX, ""));
    }
  }

  return dataLines;
};

// Helper function to handle parsed JSON data
const handleParsedData = (parsed, onMessage, onJsonChunk, onComplete) => {
  if (
    (parsed.type === "message" || parsed.type === "streaming") &&
    typeof parsed.chunk === "string"
  ) {
    onMessage?.(parsed.chunk);
  } else if (parsed.type === "json_chunk") {
    // Handle both string chunks and direct object chunks
    if (typeof parsed.chunk === "string") {
      onJsonChunk?.(parsed.chunk);
    } else if (typeof parsed.chunk === "object" && parsed.chunk !== null) {
      // Convert object chunk to string for processing
      onJsonChunk?.(JSON.stringify(parsed.chunk));
    }
  } else if (parsed.type === "complete") {
    onComplete?.(parsed);
  }
};

// Helper function to process SSE event blocks
const processEventBlock = (block, onMessage, onJsonChunk, onComplete) => {
  const dataLines = extractDataLines(block);

  if (dataLines.length === 0) {
    return;
  }

  const combined = dataLines.join("\n").trim();

  if (combined === "[DONE]") {
    onComplete?.({ done: true });
    return;
  }

  try {
    const parsed = JSON.parse(combined);
    handleParsedData(parsed, onMessage, onJsonChunk, onComplete);
  } catch {
    // Not valid JSON for this block — maybe the server sent plain text
    // or we got a non-JSON event. Ignore silently.
  }
};

// Helper function to process stream chunks
const processStreamChunks = (raw, onMessage, onJsonChunk, onComplete) => {
  const parts = raw.split(BLANK_LINE_REGEX);
  const remaining = parts.pop() || "";

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) {
      continue;
    }
    processEventBlock(trimmed, onMessage, onJsonChunk, onComplete);
  }

  return remaining;
};

export async function streamAIChat({
  user_input,
  projectId,
  onMessage,
  onJsonChunk,
  onComplete,
  onError,
}) {
  const url = `/ai_chat/${projectId}`;

  try {
    const token = Cookies.get("access_token");
    const response = await fetch(aiClient.defaults.baseURL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ user_input }),
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      } catch {
        // ignore body parse error
      }
      throw new Error(errorMessage);
    }

    if (!response.body) {
      throw new Error("No response body received from the server.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let raw = "";

    while (true) {
      const { done, value } = await reader.read();
      raw += decoder.decode(value ?? new Uint8Array(), { stream: true });
      raw = processStreamChunks(raw, onMessage, onJsonChunk, onComplete);

      if (done) break;
    }

    raw += decoder.decode();
    if (raw.trim()) {
      processStreamChunks(raw, onMessage, onJsonChunk, onComplete);
    }
  } catch (err) {
    console.error("AI Chat Error:", err);
    onError?.(err);
  }
}
