from fastapi import APIRouter

from pydantic import BaseModel

from backend.services.gemini_service import generate_ai_response


router = APIRouter()


class ChatInput(BaseModel):

    message:str


@router.post("/chat")
def chat(data:ChatInput):

    response = generate_ai_response(
        data.message
    )

    return {
        "reply": response
    }