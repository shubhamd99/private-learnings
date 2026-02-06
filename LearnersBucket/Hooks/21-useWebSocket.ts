import { useState, useEffect, useRef, useCallback } from "react";

interface UseWebSocketOptions {
  reconnect?: boolean;
  reconnectInterval?: number;
}

// <T> allows you to specify the shape of the incoming message
export function useWebSocket<T = unknown>(
  url: string,
  options: UseWebSocketOptions = {},
) {
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const [readyState, setReadyState] = useState<WebSocket>(WebSocket.CLOSED);

  // We use a Ref to hold the actual WebSocket instance so it doesn't trigger re-renders
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    try {
      const socket = new WebSocket(url);
      socketRef.current = socket;
      setReadyState(WebSocket.CONNECTING);

      socket.onopen = () => {
        console.log("WebSocket Connected");
        setReadyState(WebSocket.OPEN);
      };

      socket.onclose = () => {
        console.log("WebSocket Closed");
        setReadyState(WebSocket.CLOSED);

        // Auto-reconnect logic
        if (options.reconnect) {
          reconnectTimeoutRef.current = window.setTimeout(() => {
            connect();
          }, options.reconnectInterval || 3000);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
        socket.close();
      };

      socket.onmessage = (event) => {
        try {
          // Parse JSON automatically
          const data = JSON.parse(event.data);
          setLastMessage(data);
        } catch (e) {
          // Fallback for non-JSON messages
          setLastMessage(event.data as unknown as T);
        }
      };
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }, [url, options.reconnect, options.reconnectInterval]);

  // Initial Connection & Cleanup
  useEffect(() => {
    connect();

    return () => {
      // Cleanup on unmount
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      socketRef.current?.close();
    };
  }, [connect]);

  // Send Message Helper
  const sendMessage = useCallback((message: unknown) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      // Auto-stringify objects
      const payload =
        typeof message === "string" ? message : JSON.stringify(message);
      socketRef.current.send(payload);
    } else {
      console.warn("WebSocket is not open. Cannot send message.");
    }
  }, []);

  return {
    sendMessage,
    lastMessage,
    readyState,
    // Helper booleans for UI
    isConnected: readyState === WebSocket.OPEN,
    isConnecting: readyState === WebSocket.CONNECTING,
  };
}
