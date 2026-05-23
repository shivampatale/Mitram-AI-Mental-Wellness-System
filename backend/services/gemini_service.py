from google import genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get API key from .env
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Create Gemini client
client = genai.Client(
    api_key=GEMINI_API_KEY
)

def generate_ai_response(user_message):

    prompt = f"""
    You are Mitram AI,
    a calm and supportive AI mental wellness assistant.

    User:
    {user_message}
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    return response.text