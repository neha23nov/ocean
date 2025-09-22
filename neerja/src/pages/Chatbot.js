import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi!. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the chatbot. Please try again.");
      setMessages([...newMessages, { role: "assistant", text: "⚠️ Unable to get response." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg ${
              msg.role === "user" ? "bg-blue-600 text-right" : "bg-gray-700 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-400">Typing...</div>}
      </div>

      {error && <div className="text-red-500 p-2">{error}</div>}

      <div className="flex p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask Gemini..."
          className="flex-1 px-3 py-2 rounded-l-lg text-black"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-yellow-500 rounded-r-lg hover:bg-yellow-400 font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
