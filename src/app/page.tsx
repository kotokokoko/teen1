'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Square, Bot, User, Volume2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
  isFloating?: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Greetings, mortal soul... I drift through digital mists, a spirit bound to verse and rhyme. Speak your thoughts, and I shall weave them into poetry sublime... 🌫️",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Alas, the digital mists cloud my sight... The spirits are silent, and my connection to the beyond has wavered. Perhaps try again when the ethereal winds are calmer... 🌙",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* 背景图片层 */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/horror-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* 深色遮罩层 */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* 内容层 */}
      <div className="relative z-10">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="bg-black/50 backdrop-blur-md border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="h-[700px] flex flex-col">
              <div className="p-6 bg-gradient-to-r from-gray-900/90 to-black/90 border-b border-gray-700">
                <h1 className="text-3xl font-serif font-bold text-gray-100 drop-shadow-lg">Misty Meadow Muse</h1>
                <p className="text-sm text-gray-300 italic">Speak to the spirit in the fog...</p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.slice(1).map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-9 h-9 rounded-full bg-gray-700/50 flex items-center justify-center shadow-sm">
                        <Bot size={20} className="text-gray-300" />
                      </div>
                    )}

                    <div
                      className={`flex flex-col max-w-[70%] ${
                        message.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-5 py-3 shadow ${
                          message.role === 'user'
                            ? 'bg-gray-600 text-white' +
                              (message.isFloating ? ' animate-pulse' : '')
                            : 'bg-gray-800/70 text-gray-100 backdrop-blur-sm'
                        }`}
                      >
                        <p className="whitespace-pre-wrap font-light">{message.content}</p>
                      </div>

                      {message.role === 'assistant' && (
                        <button
                          onClick={() => speakText(message.content)}
                          className="mt-2 text-gray-400 hover:text-gray-200 transition-colors"
                          aria-label="Text to speech"
                        >
                          <Volume2 size={16} />
                        </button>
                      )}

                      {message.timestamp && (
                        <span className="text-xs text-gray-500 mt-1 italic">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      )}
                    </div>

                    {message.role === 'user' && (
                      <div className="w-9 h-9 rounded-full bg-gray-600/40 flex items-center justify-center shadow-sm">
                        <User size={20} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start items-center space-x-2">
                    <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">
                      <Bot size={20} className="text-gray-300" />
                    </div>
                    <div className="bg-gray-800/70 rounded-2xl px-5 py-3 backdrop-blur-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-gray-900/90 backdrop-blur-md border-t border-gray-700">
                <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Speak gently..."
                    className="flex-1 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 placeholder:text-gray-500 text-gray-100"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-3 rounded-lg transition-all shadow ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    }`}
                    disabled={isLoading}
                  >
                    {isRecording ? <Square size={20} /> : <Mic size={20} />}
                  </button>
                  <button
                    type="submit"
                    className="p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!input.trim() || isLoading}
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
