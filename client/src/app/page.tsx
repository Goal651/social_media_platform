"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Initialize socket connection
const socket: Socket = io("http://localhost:1000", {
  extraHeaders: {
    "x-access-token": "eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0=", // Mock token
  },
});

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("message", (data: string) => {
      setMessages((prev) => [...prev, data]); // Display messages
    });
    socket.on('notification', (data: string) => {
      setMessages((prev) => [...prev, data]); // Display messages
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("message");
      socket.off("disconnect");
    };
  }, []);

  // Handle sending messages
  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      socket.emit("message", inputMessage); // Send message to the server
      setMessages((prev) => [...prev, `You: ${inputMessage}`]); // Add to local messages
      setInputMessage(""); // Clear input field
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Wigo Chat Interface</h1>

      {/* Chat Box */}
      <div className="w-full max-w-md h-96 bg-white text-slate-700 border border-gray-300 rounded-lg shadow-lg overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center w-full max-w-md mt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 text-black border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
