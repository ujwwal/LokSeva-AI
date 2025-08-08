#lokseva ai
from dotenv import load_dotenv
import os

# Load the .env file
load_dotenv()

# Now access the API key from the environment
genai_api_key = os.getenv("GEMINI_API_KEY")

# Configure Gemini with the key
import google.generativeai as genai
genai.configure(api_key=genai_api_key)
