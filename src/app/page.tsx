'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send, Volume2, User, Bot } from 'lucide-react';

// ... (keep all the existing interfaces and logic)

export default function Home() {
  // ... (keep all the existing state and functions)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-gray-200" style={{backgroundImage: "url('https://i.redd.it/horror-vibes-in-malvern-hills-v0-9o0j4iq1g5jc1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
          <div className="h-[700px] flex flex-col">
            <div className="p-4 bg-green-50 bg-opacity-70 border-b border-green-200">
              <h1 className="text-2xl font-serif font-semibold text-gray-800">Misty Meadows Chat</h1>
              <p className="text-sm text-gray-600 italic">Converse with the spirit of the countryside</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.slice(1).map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Bot size={20} className="text-green-600" />
                    </div>
                  )}

                  <div
                    className={`flex flex-col max-w-[70%] ${
                      message.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-green-500 bg-opacity-70 text-white' + (message.isFloating ? ' animate-pulse' : '')
                          : 'bg-gray-100 bg-opacity-70 text-gray-800'
                      }`}
                    >
                      <p className="whitespace-pre-wrap font-serif">{message.content}</p>
                    </div>

                    {message.role === 'assistant' && (
                      <button
                        onClick={() => speakText(message.content)}
                        className="mt-2 text-gray-500 hover:text-gray-700 transition-colors"
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
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={20} className="text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start items-center space-x-2">
                


Copy
Regenerate

Type a message...

Claude

Click to dictate
