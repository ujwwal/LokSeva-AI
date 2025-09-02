from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.0-flash')
else:
    model = None
    print("Warning: GEMINI_API_KEY not found in environment variables")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message.strip():
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        if model is None:
            # Fallback responses when API key is not available
            fallback_responses = [
                "This scheme provides **financial support** to students.",
                "You can apply *online* at the **official portal**.",
                "This scheme is designed to help farmers increase **productivity**.",
                "Please visit your nearest government office for more details.",
                "The application deadline is typically at the end of each quarter.",
                "Documents required include Aadhar card, income certificate, and bank details."
            ]
            import random
            response_text = random.choice(fallback_responses)
        else:
            # Create a context-aware prompt for government schemes
            context_prompt = f"""You are LokSeva AI, an intelligent assistant that helps Indian citizens discover and understand government schemes, policies, and initiatives. 

User question: {user_message}

Please provide a helpful, accurate response about government schemes, policies, or benefits. If the question is not related to government schemes, gently redirect the conversation back to government-related topics while still being helpful."""

            try:
                response = model.generate_content(context_prompt)
                response_text = response.text
            except Exception as e:
                print(f"Gemini API error: {e}")
                response_text = "I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or visit your nearest government office for assistance."
        
        return jsonify({'response': response_text})
    
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)