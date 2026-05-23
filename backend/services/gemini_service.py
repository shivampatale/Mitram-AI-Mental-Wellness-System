from google import genai

from dotenv import load_dotenv

import os


load_dotenv()


client = genai.Client(
    api_key="AIzaSyBmUJEQGEa7d2FBt-OAY0O_hslCacD1Zuk"
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