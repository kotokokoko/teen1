return (
  <div className="min-h-screen bg-gradient-to-b from-gray-100 via-emerald-50 to-gray-200">
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="bg-white/80 backdrop-blur-md border border-emerald-100 rounded-xl shadow-lg overflow-hidden">
        <div className="h-[700px] flex flex-col">
          <div className="p-6 bg-gradient-to-r from-emerald-50 to-gray-100 border-b border-emerald-100">
            <h1 className="text-3xl font-serif font-bold text-emerald-900 drop-shadow-sm">Misty Meadow Muse</h1>
            <p className="text-sm text-emerald-700 italic">Speak to the spirit in the fog...</p>
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
                  <div className="w-9 h-9 rounded-full bg-emerald-200/50 flex items-center justify-center shadow-sm">
                    <Bot size={20} className="text-emerald-700" />
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
                        ? 'bg-emerald-500 text-white' +
                          (message.isFloating ? ' animate-pulse' : '')
                        : 'bg-white/70 text-emerald-900 backdrop-blur-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap font-light">{message.content}</p>
                  </div>

                  {message.role === 'assistant' && (
                    <button
                      onClick={() => speakText(message.content)}
                      className="mt-2 text-emerald-500 hover:text-emerald-700 transition-colors"
                      aria-label="Text to speech"
                    >
                      <Volume2 size={16} />
                    </button>
                  )}

                  {message.timestamp && (
                    <span className="text-xs text-gray-400 mt-1 italic">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="w-9 h-9 rounded-full bg-gray-300/40 flex items-center justify-center shadow-sm">
                    <User size={20} className="text-gray-700" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start items-center space-x-2">
                <div className="w-9 h-9 rounded-full bg-emerald-200 flex items-center justify-center">
                  <Bot size={20} className="text-emerald-700" />
                </div>
                <div className="bg-white/70 rounded-2xl px-5 py-3 backdrop-blur-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white/90 backdrop-blur-md border-t border-emerald-100">
            <form onSubmit={handleSubmit} className="flex items-center space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Speak gently..."
                className="flex-1 p-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50 placeholder:text-emerald-400 text-emerald-800"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-3 rounded-lg transition-all shadow ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
                }`}
                disabled={isLoading}
              >
                {isRecording ? <Square size={20} /> : <Mic size={20} />}
              </button>
              <button
                type="submit"
                className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
);
