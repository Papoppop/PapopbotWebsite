import React, { useState, useEffect, useRef, FormEvent } from 'react';
import '../css/ChatPage.css'

interface Message {
  text: string;
  sender: 'user' | 'bot';
  isTyping?: boolean;
}

interface ChatResponse {
  fulfillmentText: string;
  intent?: string;
  confidence?: number;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string>(`user-${Date.now()}`);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Check if user is on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      // Common breakpoint for mobile devices
      const mobileBreakpoint = 768;
      setIsMobile(window.innerWidth < mobileBreakpoint);
      
      // Only apply no-scroll to body on desktop
      if (window.innerWidth >= mobileBreakpoint) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Check on window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const TypewriterEffect: React.FC<{ text: string, onComplete: () => void }> = ({ text, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(currentIndex + 1);
        }, 30); // Speed of typing - adjust as needed
        
        return () => clearTimeout(timer);
      } else {
        onComplete();
      }
    }, [currentIndex, text, onComplete]);
    
    return <>{displayText}</>;
  };

  // Handle sending message to the chatbot
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message to chat (only visible on mobile)
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send request to your Dialogflow API
      const response = await fetch('https://api.papopbot.com/chat', {
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
      
      // Add bot response with typing indicator initially
      const botResponseText = data.fulfillmentText || "ขอโทษครับ ผมไม่เข้าใจ";
      setMessages(prev => [
        ...prev,
        { text: botResponseText, sender: 'bot', isTyping: true }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { text: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ในขณะนี้", sender: 'bot', isTyping: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark message as complete (typing finished)
  const markMessageComplete = (index: number) => {
    setMessages(prevMessages => 
      prevMessages.map((msg, i) => 
        i === index ? { ...msg, isTyping: false } : msg
      )
    );
  };

  // Get only the latest bot message for desktop view
  const getLatestBotMessage = () => {
    const botMessages = messages.filter(msg => msg.sender === 'bot');
    return botMessages.length > 0 ? botMessages[botMessages.length - 1] : null;
  };

  return (
    <div className={`h-screen w-full ${!isMobile ? 'overflow-hidden' : ''}`}>
      {isMobile ? (
        // Mobile view - scrollable
        <div className="w-full h-full flex flex-col">
          {/* Messages container with padding at the bottom to make room for the fixed form */}
          <div id="chatbox" className="flex-1 overflow-y-auto bg-gray-900 bg-opacity-75 p-4 pb-20">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-white text-center px-8 flex-col space-y-3">
                <p className='text-m'>👋 Say 'สวัสดี' to Papop-bot!</p>
                <p className='text-sm text-gray-400'>Papop-bot only supports Thai language</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex w-full mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender !== 'user' ? 
                    <img src="https://i.postimg.cc/1tZj0zvp/Papop-bot.png" alt="Papop-bot" className="w-10 h-10 rounded-full mr-2" />
                  : null}
                  <div
                    className={`p-3 rounded-xl max-w-xs break-words leading-relaxed
                      ${message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-700 text-white rounded-bl-none'}`}
                  >
                    {message.sender === 'bot' && message.isTyping ? (
                      <TypewriterEffect 
                        text={message.text} 
                        onComplete={() => markMessageComplete(index)} 
                      />
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Fixed form at the bottom */}
          <form className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg z-10" onSubmit={sendMessage}>
            <div className='flex'>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-gray-800 focus:outline-none text-white border-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Desktop view with independently positioned elements
        <div id='largescreen' className='fixed inset-0 bg-[url(https://i.postimg.cc/L6hkx8h7/2nd-Anniversary-forbg.png)] bg-cover bg-no-repeat bg-center'>
          {/* Bot image - completely independent */}
          <img src='./images/developers/papopbot/image.png' alt='Papop-bot' className='papopbotimage' />
          
          {messages.length === 0 ? (
            <div id="instruction">
              <p className='text-m'>👋 Say 'สวัสดี' to Papop-bot!</p>
              <p className='text-sm'>Papop-bot only supports Thai language for now</p>
            </div>
          ) : (
            <div id="chatbox" className="chat-bubble-container">
              {/* Only show the latest bot message */}
              {getLatestBotMessage() && (
                <div className="p-4 px-6 rounded-xl break-words leading-relaxed text-white rounded-bl-none speech-bubble">
                  {getLatestBotMessage()?.isTyping ? (
                    <TypewriterEffect 
                      text={getLatestBotMessage()?.text || ""} 
                      onComplete={() => {
                        // Find the index of the latest bot message
                        const index = messages.findIndex(
                          msg => msg === getLatestBotMessage()
                        );
                        if (index !== -1) {
                          markMessageComplete(index);
                        }
                      }} 
                    />
                  ) : (
                    getLatestBotMessage()?.text
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Input form - always visible at the bottom */}
          <form className="input" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              disabled={isLoading}
              className="px-4 py-2 bg-gray-800 focus:outline-none text-white border-none rounded-l-md"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        
        </div>
      )}
    </div>
  );
};

export default ChatPage;