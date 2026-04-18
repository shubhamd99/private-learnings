import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  text: string;
  isAI: boolean;
  status?: 'sending' | 'sent';
}

const MOCK_AI_RESPONSES = [
  "That's interesting! Tell me more.",
  'I can certainly help with that.',
  'Could you clarify what you mean?',
  'Here is some information that might help.',
  'Let me think about that for a second...',
];

export const useChat = () => {
  // Active UI messages (capped at 12)
  const [messages, setMessages] = useState<Message[]>([]);
  // Archived older messages physically moved out of active state
  const [historyCache, setHistoryCache] = useState<Message[]>([]);

  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    // OPTIMISTIC UI UPDATE:
    const userMsg: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isAI: false,
      status: 'sending',
    };

    // Inverted List: Prepend new messages to the front
    setMessages(prev => {
      const updated = [userMsg, ...prev];
      // Prune active array and move oldest to historyCache if exceeding 12
      if (updated.length > 12) {
        setHistoryCache(h => [...updated.slice(12), ...h]);
        return updated.slice(0, 12);
      }
      return updated;
    });

    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * MOCK_AI_RESPONSES.length);
      const responseText = MOCK_AI_RESPONSES[randomIndex];

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isAI: true,
      };

      setMessages(prev => {
        const nextState = [
          aiMsg,
          ...prev.map(msg =>
            msg.id === userMsg.id
              ? ({ ...msg, status: 'sent' } as Message)
              : msg,
          ),
        ];

        // Ensure active cap remains 12 even after AI responds
        if (nextState.length > 12) {
          setHistoryCache(h => [...nextState.slice(12), ...h]);
          return nextState.slice(0, 12);
        }
        return nextState;
      });
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  }, []);

  const loadMoreMessages = useCallback(() => {
    // Stop if already loading or if there are no older messages archived
    if (isLoadingHistory || historyCache.length === 0) return;

    setIsLoadingHistory(true);

    setTimeout(() => {
      setMessages(prev => {
        // Pop the first 12 archived messages from the historyCache
        const batchToRestore = historyCache.slice(0, 12);

        // Remove them from the history cache directly
        setHistoryCache(h => h.slice(12));

        // Append to the end of our inverted active screen array
        return [...prev, ...batchToRestore];
      });
      setIsLoadingHistory(false);
    }, 1500);
  }, [isLoadingHistory, historyCache]);

  return {
    messages,
    isTyping,
    sendMessage,
    isLoadingHistory,
    loadMoreMessages,
  };
};
