import { useEffect, useState, useRef, useCallback } from "react";

export interface OrderStatus {
  id: string;
  status: "pending" | "preparing" | "dispatched" | "delivered";
  eta: string;
}

/**
 * `useOrderTracker` Custom Hook
 *
 * What it does:
 * Establishes and manages a real-time WebSocket connection to track the live status of a specific order.
 * It provides the consuming component with the latest order data and the current connection status.
 *
 * How it works (Technical details):
 * - WebSocket API: Uses the native browser WebSocket API to listen for server-pushed updates.
 * - State Management: React's `useState` tracks both the parsed order payload (`order`) and socket connectivity state (`status`).
 * - Exponential Backoff: If the connection drops unexpectedly, it attempts to reconnect with progressively longer delays
 *   (1s, 2s, 4s, etc.), capped at 30 seconds to avoid spamming the server.
 * - Memory Safety: Utilizes `useRef` to maintain mutable references to the WebSocket instance and timeout identifier
 *   without triggering re-renders. A cleanup function in `useEffect` ensures connections and timeouts are destroyed on unmount.
 */
export function useOrderTracker(orderId: string) {
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [status, setStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("disconnected");

  const ws = useRef<WebSocket | null>(null);
  const reconnectCount = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maxReconnectDelay = 30000; // Cap exponential backoff at 30s

  const connect = useCallback(() => {
    if (!orderId) return;

    setStatus("connecting");
    ws.current = new WebSocket(`wss://api.example.com/orders/${orderId}`);

    ws.current.onopen = () => {
      setStatus("connected");
      reconnectCount.current = 0;
    };

    ws.current.onmessage = (event) => {
      try {
        const data: OrderStatus = JSON.parse(event.data);
        setOrder(data);
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    ws.current.onclose = (event) => {
      setStatus("disconnected");

      // Reconnect if the connection was not closed intentionally
      if (event.code !== 1000) {
        const delay = Math.min(
          Math.pow(2, reconnectCount.current) * 1000,
          maxReconnectDelay,
        );
        reconnectCount.current += 1;

        console.log(`Attempting reconnect in ${delay}ms...`);
        timeoutRef.current = setTimeout(() => {
          connect();
        }, delay);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
  }, [orderId]);

  useEffect(() => {
    connect();

    return () => {
      // Clean up timeout and websocket on component unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (ws.current) {
        ws.current.close(1000, "Component unmounted");
      }
    };
  }, [connect]);

  return { order, status };
}
