import { useEffect } from "react";

export default function useSocket() {
  const socket = new WebSocket(`${import.meta.env.VITE_SOCKET_URL}/chat`);
  useEffect(() => {
    socket.onopen = (event) => {
      socket.send(JSON.stringify({method: "connection", name: "Yan is online", id: 2 }));
    };
    socket.onmessage = (message) => {
      console.log(message);
    };

    return () => {
      socket.close();
    };
  }, []);
}
