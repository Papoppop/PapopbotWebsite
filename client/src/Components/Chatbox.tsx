import React, { useState, useEffect, useRef, FormEvent } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatResponse {
  fulfillmentText: string;
  intent?: string;
  confidence?: number;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string>(`user-${Date.now()}`);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending message to the chatbot
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Send request to your Dialogflow API
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          sessionId: sessionId.current,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }
      
      const data: ChatResponse = await response.json();
      
      // Add bot response to chat
      setMessages(prev => [
        ...prev, 
        { text: data.fulfillmentText || "ขอโทษครับ ผมไม่เข้าใจ", sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev, 
        { text: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ในขณะนี้", sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl h-[600px] mx-auto rounded-xl shadow-lg overflow-hidden flex flex-col bg-gray-50">
      <div className="bg-indigo-600 text-white p-4 text-center">
        <h2 className="text-xl font-semibold">Chatbot</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-center px-8">
            <p>👋 Send a message to start chatting with the bot!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`max-w-[70%] p-3 rounded-xl break-words leading-relaxed
                ${message.sender === 'user' 
                  ? 'ml-auto bg-blue-950 text-white rounded-br-sm' 
                  : 'mr-auto bg-[#b4dffe] text-white rounded-bl-sm shadow-sm'}`}
            >
              {message.text}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="mr-auto bg-white text-gray-500 rounded-xl rounded-bl-sm p-3 flex items-center justify-center min-w-[60px] min-h-[36px]">
            <span className="inline-block w-2 h-2 mx-0.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "-0.32s" }}></span>
            <span className="inline-block w-2 h-2 mx-0.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "-0.16s" }}></span>
            <span className="inline-block w-2 h-2 mx-0.5 bg-gray-400 rounded-full animate-bounce"></span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className="p-4 border-t border-gray-200 flex" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
          className="flex-1 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300"
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;