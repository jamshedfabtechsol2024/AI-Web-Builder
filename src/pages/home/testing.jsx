// import { useState } from 'react';
// import {
//   Conversation,
//   ConversationContent,
// } from '@/components/ui/ai-elements/conversation';
// import { Loader } from '@/components/ui/ai-elements/loader';
// import { Message, MessageContent } from '@/components/ui/ai-elements/message';
// import {
//   PromptInput,
//   PromptInputSubmit,
//   PromptInputTextarea,
// } from '@/components/ui/ai-elements/prompt-input';
// import {
//   Suggestion,
//   Suggestions,
// } from '@/components/ui/ai-elements/suggestion';
// import {
//   WebPreview,
//   WebPreviewBody,
//   WebPreviewNavigation,
//   WebPreviewUrl,
// } from '@/components/ui/ai-elements/web-preview';

// export default function Home() {
//   const [message, setMessage] = useState('');
//   const [currentChat, setCurrentChat] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim() || isLoading) {
//       return;
//     }

//     const userMessage = message.trim();
//     setMessage('');
//     setIsLoading(true);

//     setChatHistory((prev) => [...prev, { type: 'user', content: userMessage }]);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: userMessage,
//           chatId: currentChat?.id,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create chat');
//       }

//       const chat = await response.json();
//       setCurrentChat(chat);

//       setChatHistory((prev) => [
//         ...prev,
//         {
//           type: 'assistant',
//           content: 'Generated new app preview. Check the preview panel!',
//         },
//       ]);
//     } catch (error) {
//       // console.error('Error:', error);
//       setChatHistory((prev) => [
//         ...prev,
//         {
//           type: 'assistant',
//           content:
//             'Sorry, there was an error creating your app. Please try again.',
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Chat Panel */}
//       <div className="flex w-1/2 flex-col border-r">
//         {/* Header */}
//         <div className="flex h-14 items-center justify-between border-b p-3">
//           <h1 className="font-semibold text-lg">v0 Clone</h1>
//         </div>

//         <div className="flex-1 space-y-4 overflow-y-auto p-4">
//           {chatHistory.length === 0 ? (
//             <div className="mt-8 text-center font-semibold">
//               <p className="mt-4 text-3xl">What can we build together?</p>
//             </div>
//           ) : (
//             <>
//               <Conversation>
//                 <ConversationContent>
//                   {chatHistory.map((msg, idx) => (
//                     <Message from={msg.type} key={msg.id || idx}>
//                       <MessageContent>{msg.content}</MessageContent>
//                     </Message>
//                   ))}
//                 </ConversationContent>
//               </Conversation>
//               {isLoading && (
//                 <Message from="assistant">
//                   <MessageContent>
//                     <div className="flex items-center gap-2">
//                       <Loader />
//                       Creating your app...
//                     </div>
//                   </MessageContent>
//                 </Message>
//               )}
//             </>
//           )}
//         </div>

//         {/* Input */}
//         <div className="border-t p-4">
//           {!currentChat && (
//             <Suggestions>
//               <Suggestion
//                 onClick={() =>
//                   setMessage('Create a responsive navbar with Tailwind CSS')
//                 }
//                 suggestion="Create a responsive navbar with Tailwind CSS"
//               />
//               <Suggestion
//                 onClick={() => setMessage('Build a todo app with React')}
//                 suggestion="Build a todo app with React"
//               />
//               <Suggestion
//                 onClick={() =>
//                   setMessage('Make a landing page for a coffee shop')
//                 }
//                 suggestion="Make a landing page for a coffee shop"
//               />
//             </Suggestions>
//           )}
//           <div className="flex gap-2">
//             <PromptInput
//               className="relative mx-auto mt-4 w-full max-w-2xl"
//               onSubmit={handleSendMessage}
//             >
//               <PromptInputTextarea
//                 className="min-h-[60px] pr-12"
//                 onChange={(e) => setMessage(e.target.value)}
//                 value={message}
//               />
//               <PromptInputSubmit
//                 className="absolute right-1 bottom-1"
//                 disabled={!message}
//                 status={isLoading ? 'streaming' : 'ready'}
//               />
//             </PromptInput>
//           </div>
//         </div>
//       </div>

//       {/* Preview Panel */}
//       <div className="flex w-1/2 flex-col">
//         <WebPreview>
//           <WebPreviewNavigation>
//             <WebPreviewUrl
//               placeholder="Your app here..."
//               readOnly
//               value={currentChat?.demo}
//             />
//           </WebPreviewNavigation>
//           <WebPreviewBody src={currentChat?.demo} />
//         </WebPreview>
//       </div>
//     </div>
//   );
// }
