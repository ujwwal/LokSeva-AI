# LokSeva AI Chatbot UI

This is a React-based chatbot interface for the LokSeva AI assistant that helps Indian citizens discover and understand government schemes and policies.

## Features

- **Clean Chat Interface**: Modern chat bubble design with user messages on the right (blue) and bot messages on the left (gray)
- **Interactive Input**: Text input field with Send button and Enter key support
- **Random Responses**: Bot provides helpful placeholder responses about government schemes
- **Responsive Design**: Built with Tailwind CSS for a mobile-friendly interface
- **Demo Ready**: Clean, minimal design perfect for screenshots and demonstrations

## Getting Started

### Prerequisites

- Node.js (14.0 or later)
- npm or yarn

### Installation

1. Navigate to the chatbot-ui directory:
   ```bash
   cd chatbot-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Bot Response Examples

The chatbot randomly responds with one of these helpful messages:

- "This scheme provides financial support to students."
- "You can apply online at the official portal."
- "This scheme is designed to help farmers increase productivity."
- "Please visit your nearest government office for more details."
- "The application deadline is typically at the end of each quarter."
- "Documents required include Aadhar card, income certificate, and bank details."

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Works on desktop and mobile devices

## Project Structure

```
chatbot-ui/
├── src/
│   ├── App.jsx          # Main chatbot component
│   ├── index.css        # Tailwind CSS imports
│   └── main.jsx         # React entry point
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Future Enhancements

This UI is designed to be easily integrated with:
- The existing Gemini Pro backend
- Real-time API responses
- WebSocket connections for live chat
- User authentication
- Chat history persistence
