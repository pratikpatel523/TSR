
import React, { useState, useEffect, useRef } from 'react';
import { ParsedLogs } from '../types';
import { generateAnalysisStream } from '../services/geminiService';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  logs: ParsedLogs;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, logs }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    if(isOpen) {
        setMessages([
            { sender: 'ai', text: "Hello! I am your AI assistant. I can help you analyze these logs. What issue are you looking for?" }
        ]);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add a placeholder for AI response
    setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

    try {
        const stream = await generateAnalysisStream(logs.rawLogs, input);
        for await (const chunk of stream) {
            setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage && lastMessage.sender === 'ai') {
                    const updatedMessages = [...prev.slice(0, -1), { ...lastMessage, text: lastMessage.text + chunk }];
                    return updatedMessages;
                }
                return prev;
            });
        }
    } catch (error) {
        console.error('Gemini API error:', error);
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.sender === 'ai') {
                return [...prev.slice(0, -1), { ...lastMessage, text: "Sorry, I encountered an error. Please check your API key and try again." }];
            }
            return [...prev, { sender: 'ai', text: "Sorry, I encountered an error. Please check your API key and try again." }];
        });
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4">
      <div className="bg-brand-surface w-full max-w-2xl h-[80vh] rounded-xl shadow-2xl flex flex-col">
        <header className="p-4 border-b border-brand-primary flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            AI Assistant
          </h2>
          <button onClick={onClose} className="text-brand-secondary hover:text-brand-text">&times;</button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-brand-accent text-white' : 'bg-brand-primary'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text || '...'}</p>
              </div>
            </div>
          ))}
           <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 border-t border-brand-primary">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about log issues..."
              className="flex-1 bg-brand-primary border border-brand-secondary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Thinking...' : 'Send'}
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default AIAssistant;
