import { useState } from 'react'

const botResponses = [
  "This scheme provides financial support to students.",
  "You can apply online at the official portal.",
  "This scheme is designed to help farmers increase productivity.",
  "Please visit your nearest government office for more details.",
  "The application deadline is typically at the end of each quarter.",
  "Documents required include Aadhar card, income certificate, and bank details."
]

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm here to help you with government schemes and policies. How can I assist you today?", isBot: true }
  ])
  const [inputValue, setInputValue] = useState('')

  const getRandomBotResponse = () => {
    return botResponses[Math.floor(Math.random() * botResponses.length)]
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      isBot: false
    }

    const botMessage = {
      id: Date.now() + 1,
      text: getRandomBotResponse(),
      isBot: true
    }

    setMessages(prev => [...prev, userMessage, botMessage])
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="relative">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">LokSeva AI Assistant</h1>
                <p className="text-blue-100 text-sm font-medium">Your intelligent guide to government schemes and policies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/50 to-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${message.isBot ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'}`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                message.isBot 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                  : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
              }`}>
                {message.isBot ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              
              {/* Message Bubble */}
              <div
                className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                  message.isBot
                    ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-md'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about government schemes, policies, or benefits..."
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-500"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                </svg>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:hover:shadow-lg group"
            >
              <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button 
              onClick={() => setInputValue("What are the education schemes available?")}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200 border border-blue-200"
            >
              Education Schemes
            </button>
            <button 
              onClick={() => setInputValue("Tell me about farmer benefits")}
              className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm hover:bg-green-100 transition-colors duration-200 border border-green-200"
            >
              Farmer Benefits
            </button>
            <button 
              onClick={() => setInputValue("What are the women empowerment schemes?")}
              className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm hover:bg-purple-100 transition-colors duration-200 border border-purple-200"
            >
              Women Schemes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
