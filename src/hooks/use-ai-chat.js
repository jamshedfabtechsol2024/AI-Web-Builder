// useAIChat.js
import { useCallback, useState } from "react";
import { streamAIChat } from "@/api/ai-chat";
import { toast } from "sonner";

// Regex patterns defined at top level for performance
const JSON_PREFIX_REGEX = /^\s*json\s*\n?/i;
const JSON_FENCE_START_REGEX = /^\s*```(?:json)?\s*\n?/i;
const JSON_FENCE_END_REGEX = /\n?```\s*$/i;
const NORMALIZE_START_REGEX = /^\s*```(?:json)?\s*/i;
const NORMALIZE_END_REGEX = /\n?```\s*$/i;
const NORMALIZE_JSON_REGEX = /^\s*json\s*/i;
const LEADING_NEWLINE_REGEX = /^\s*\n+/;

export function useAIChat(projectId) {
  const [messages, setMessages] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [aiJson, setAiJson] = useState(null); // parsed final JSON object (if any)
  const [jsonBufferPreview, setJsonBufferPreview] = useState(""); // for UI preview
  const [hasJsonStarted, setHasJsonStarted] = useState(false);
  const [projectName, setProjectName] = useState(null); // live project name from streaming

  // Cleans common code-fence / "json" prefixes for streaming json chunks
  const cleanJsonChunkFragment = (chunk) => {
    if (!chunk) {
      return "";
    }
    let out = chunk;

    // remove leading newlines at the start of the fragment
    out = out.replace(LEADING_NEWLINE_REGEX, "");

    // remove a starting `json\n` marker
    out = out.replace(JSON_PREFIX_REGEX, "");

    // remove a leading ```json or ``` marker if present at the start of the fragment
    out = out.replace(JSON_FENCE_START_REGEX, "");

    // remove a trailing closing ``` if the fragment ends with it
    out = out.replace(JSON_FENCE_END_REGEX, "");

    return out;
  };

  // Normalize whole buffer for final parse (strip fences if still present)
  const normalizeFullJsonString = (s) => {
    if (!s) {
      return s;
    }
    return s
      .replace(LEADING_NEWLINE_REGEX, "")
      .replace(NORMALIZE_START_REGEX, "")
      .replace(NORMALIZE_END_REGEX, "")
      .replace(NORMALIZE_JSON_REGEX, "")
      .trim();
  };

  const handleMessage = useCallback((chunk) => {
    // append message chunks directly (emoji/unicode will be correct because the parser already JSON.parsed value)
    setMessages((prev) => prev + chunk);
  }, []);

  const handleJsonChunk = useCallback(
    (chunk, localJsonBuffer, setLocalJsonBuffer) => {
      setHasJsonStarted(true);

      // If chunk is already a JSON object (stringified), try to parse it directly
      try {
        const parsedChunk = JSON.parse(chunk);
        if (parsedChunk && typeof parsedChunk === "object") {
          // This is a complete object, use it directly
          setAiJson(parsedChunk);
          setJsonBufferPreview(JSON.stringify(parsedChunk, null, 2));
          return;
        }
      } catch {
        // Not a complete object, treat as string fragment
      }

      // clean known fences/prefixes then append to local buffer for string fragments
      const cleaned = cleanJsonChunkFragment(chunk);
      const newBuffer = localJsonBuffer + cleaned;
      setLocalJsonBuffer(newBuffer);

      // update preview state so UI can show partial JSON
      setJsonBufferPreview(newBuffer);

      // try progressive parse for early preview
      try {
        const normalized = normalizeFullJsonString(newBuffer);
        if (!normalized) {
          return;
        }
        const maybeObj = JSON.parse(normalized);
        if (maybeObj && typeof maybeObj === "object") {
          setAiJson(maybeObj);
        }
      } catch {
        // ignore until full JSON available
      }
    },
    []
  );

  // Helper function to parse JSON from buffer
  const parseJsonFromBuffer = useCallback((localJsonBuffer) => {
    try {
      const normalized = normalizeFullJsonString(localJsonBuffer);
      if (normalized) {
        const parsed = JSON.parse(normalized);
        if (parsed && typeof parsed === "object") {
          setAiJson(parsed);
        }
      }
    } catch {
      // final JSON parse failed — keep partial preview in jsonBufferPreview
    }
  }, []);

  const handleComplete = useCallback(
    (data, localJsonBuffer) => {
      setIsStreaming(false);

      // Capture project name from completion data if available
      if (data?.project_name) {
        setProjectName(data.project_name);
      }

      // backend might sometimes return final object as data.ai_json
      if (data?.ai_json) {
        setAiJson(data.ai_json);
      } else {
        parseJsonFromBuffer(localJsonBuffer);
      }

      setJsonBufferPreview("");
      setHasJsonStarted(false);
    },
    [parseJsonFromBuffer]
  );

  const handleError = useCallback((err) => {
    setIsStreaming(false);
    setHasJsonStarted(false);
    setJsonBufferPreview("");
    setMessages(""); // Clear any partial message content

    const message = err?.message || "Something went wrong.";

    if (message.toLowerCase().includes("insufficient tokens")) {
      toast.error(
        "Insufficient tokens — please upgrade your plan or wait for renewal."
      );
    } else if (message.toLowerCase().includes("unauthorized")) {
      toast.error("Session expired — please log in again.");
    } else if (message.toLowerCase().includes("network")) {
      toast.error("Network issue — please check your connection.");
    } else {
      toast.error(message);
    }
  }, []);

  const sendMessage = useCallback(
    async (user_input) => {
      if (!user_input?.trim()) {
        return;
      }

      // local buffer variable so callbacks see up-to-date accumulation (avoid stale closure on state)
      let localJsonBuffer = "";

      // reset UI state
      setMessages("");
      setIsStreaming(true);
      setAiJson(null);
      setJsonBufferPreview("");
      setHasJsonStarted(false);

      // start streaming
      await streamAIChat({
        user_input,
        projectId,
        onMessage: handleMessage,
        onJsonChunk: (chunk) =>
          handleJsonChunk(chunk, localJsonBuffer, (newBuffer) => {
            localJsonBuffer = newBuffer;
          }),
        onComplete: (data) => handleComplete(data, localJsonBuffer),
        onError: handleError,
      });
    },
    [projectId, handleMessage, handleJsonChunk, handleComplete, handleError]
  );

  const resetStream = useCallback(() => {
    setMessages("");
    setAiJson(null);
    setIsStreaming(false);
    setJsonBufferPreview("");
    setHasJsonStarted(false);
    // Don't reset projectName - keep it for display
  }, []);

  return {
    messages,
    aiJson,
    isStreaming,
    hasJsonStarted,
    jsonBufferPreview,
    projectName,
    sendMessage,
    resetStream,
  };
}
