// Utility functions for message handling and merging

/**
 * Merges conversation messages with local streaming messages
 * @param {Array} conversationMessages - Messages from conversation API
 * @param {Array} localMessages - Local streaming messages
 * @param {string} streamText - Current streaming text
 * @returns {Array} Merged and sorted messages
 */
export const mergeMessages = (
  conversationMessages = [],
  localMessages = [],
  streamText = ""
) => {
  const allMessages = [];
  const conversationIds = new Set();

  // Add conversation messages (converted to our format)
  for (const msg of conversationMessages) {
    // Add user message
    const userMsg = {
      id: `${msg.id}-user`,
      from: "user",
      content: msg.user_input,
      timestamp: new Date(msg.created),
      hasJson: false, // User messages don't have JSON
      generated_json: null,
    };

    // Add assistant message (this is where JSON comes from)
    const assistantMsg = {
      id: `${msg.id}-ai`,
      from: "assistant",
      content: msg.ai_message,
      timestamp: new Date(msg.created),
      hasJson:
        msg.hasJson ||
        (msg.generated_json && Object.keys(msg.generated_json).length > 0),
      generated_json: msg.generated_json,
    };

    allMessages.push(userMsg, assistantMsg);
    conversationIds.add(`${msg.id}-user`);
    conversationIds.add(`${msg.id}-ai`);
  }

  // Add local streaming messages only if they're not already in conversation
  for (const msg of localMessages) {
    if (!conversationIds.has(msg.id)) {
      allMessages.push({
        ...msg,
        content: msg._streaming ? streamText : msg.content,
      });
    }
  }

  return allMessages.sort((a, b) => a.timestamp - b.timestamp);
};

/**
 * Creates a user message object
 * @param {string} content - Message content
 * @returns {Object} User message object
 */
export const createUserMessage = (content) => ({
  id: Date.now(),
  from: "user",
  content,
  timestamp: new Date(),
});

/**
 * Creates an assistant message object for streaming
 * @param {number} baseId - Base ID for the message
 * @returns {Object} Assistant message object
 */
export const createAssistantMessage = (baseId) => ({
  id: baseId + 1,
  from: "assistant",
  content: "",
  timestamp: new Date(),
  _streaming: true,
});
