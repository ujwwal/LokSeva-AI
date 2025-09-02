# LokSeva AI Flask App

A Flask-based chatbot application that integrates with Google's Gemini AI to help Indian citizens discover and understand government schemes and policies.

## Features

- 🤖 **Real AI Integration**: Powered by Google Gemini 2.0 Flash for intelligent responses
- 💬 **Beautiful Chat UI**: Modern, responsive chat interface with Tailwind CSS
- 🎯 **Government Focus**: Specialized in Indian government schemes and policies
- 🚀 **Quick Actions**: Pre-built buttons for common queries
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices

## Setup

### Prerequisites

- Python 3.8 or higher
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd LokSeva-AI
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

5. Run the application:
   ```bash
   python app.py
   ```

6. Open your browser and visit `http://localhost:5000`

## Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key and add it to your `.env` file

## Project Structure

```
LokSeva-AI/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── .env.example       # Environment variables template
├── templates/
│   └── index.html     # Main chat interface
├── static/
│   └── js/
│       └── chat.js    # Frontend JavaScript
├── chatbot-ui/        # Original React app (for reference)
└── Gemini/           # Original Gemini experiments
```

## Features Explained

### Chat Interface
- Clean, modern design inspired by popular messaging apps
- Distinct styling for user and bot messages
- Real-time message timestamps
- Smooth animations and hover effects

### AI Integration
- Uses Google Gemini 2.0 Flash model for fast, accurate responses
- Context-aware prompts focused on government schemes
- Graceful fallback to static responses if API is unavailable
- Error handling for network issues

### Quick Actions
- Pre-defined buttons for common queries
- Categories: Education Schemes, Farmer Benefits, Women Schemes
- One-click message sending

## API Endpoints

### `GET /`
Returns the main chat interface.

### `POST /api/chat`
Processes chat messages and returns AI responses.

**Request:**
```json
{
  "message": "What are the education schemes available?"
}
```

**Response:**
```json
{
  "response": "Here are the major education schemes available..."
}
```

## Customization

### Adding New Quick Actions
Edit `templates/index.html` and add new buttons:

```html
<button class="quick-action ..." data-message="Your custom message">
    Custom Action
</button>
```

### Modifying AI Behavior
Edit the `context_prompt` in `app.py` to change how the AI responds:

```python
context_prompt = f"""Your custom AI instructions here...

User question: {user_message}

Your response guidelines..."""
```

### Styling Changes
The app uses Tailwind CSS for styling. You can modify classes in `templates/index.html` or add custom CSS.

## Development

### Running in Debug Mode
The app runs in debug mode by default when using `python app.py`. For production:

```python
app.run(debug=False, host='0.0.0.0', port=5000)
```

### Testing Without API Key
The app includes fallback responses when no API key is provided, useful for testing the interface.

## Deployment

For production deployment, consider:

1. **Environment Variables**: Use a proper secrets management system
2. **WSGI Server**: Use Gunicorn or uWSGI instead of the development server
3. **Reverse Proxy**: Use Nginx for serving static files and SSL termination
4. **Rate Limiting**: Implement rate limiting for the `/api/chat` endpoint

Example with Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.