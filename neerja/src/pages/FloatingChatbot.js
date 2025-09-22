import React, { useState } from "react";
import Chatbot from "./Chatbot";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-yellow-500 rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-400 z-50"
        >
          🤖
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] z-50">
          <div className="flex flex-col h-full bg-[#0D1117] rounded-xl shadow-lg">
            <div className="flex justify-between p-4 bg-blue-900 rounded-t-xl">
              <h2 className="text-white font-bold">Tunchik ChatBot</h2>
              <button onClick={() => setOpen(false)} className="text-white font-bold text-xl">
                ×
              </button>
            </div>
            <Chatbot />
          </div>
        </div>
      )}
    </>
  );
}
