from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import HTTPBearer
from jose import jwt
import os
from dotenv import load_dotenv

security = HTTPBearer()

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = "HS256"


def get_current_user(
    token = Depends(security)
):

    try:

        payload = jwt.decode(
            token.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("email")

        if not email:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return email

    except:

        raise HTTPException(
            status_code=401,
            detail="Authentication failed"
        )