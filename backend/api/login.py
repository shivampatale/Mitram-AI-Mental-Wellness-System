from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

users = []

class LoginInput(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data: LoginInput):

    for user in users:

        if (
            user["email"] == data.email
            and
            user["password"] == data.password
        ):

            return {
                "success": True,
                "message": "Login successful",
                "user": {
                    "name": user["name"],
                    "email": user["email"]
                }
            }

    return {
        "success": False,
        "message": "Invalid email or password"
    }