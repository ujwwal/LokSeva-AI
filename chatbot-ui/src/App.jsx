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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-semibold">LokSeva AI Assistant</h1>
          <p className="text-blue-100 text-sm">Your guide to government schemes and policies</p>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question about government schemes..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
