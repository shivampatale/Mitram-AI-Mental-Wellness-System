from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.services.auth_service import create_access_token
from backend.services.auth_service import (
    create_access_token,
    get_current_user
)

from backend.services.security_service import (
    hash_password,
    verify_password
)

from backend.database.db_session import get_db

from backend.database.user_db import (
    create_user,
    get_user_by_email
)

router = APIRouter()


class AuthInput(BaseModel):

    username: str | None = None

    email: str

    password: str


# =========================
# SIGNUP
# =========================

@router.post("/signup")
def signup(

    data: AuthInput,

    db: Session = Depends(get_db)

):

    existing_user = get_user_by_email(

        db,

        data.email
    )

    if existing_user:

        return {

            "message": "User already exists"
        }

    # HASH PASSWORD
    hashed_password = hash_password(
        str(data.password)
    )

    # CREATE USER
    create_user(

        db,

        data.username,

        data.email,

        hashed_password
    )

    # GENERATE TOKEN
    token = create_access_token({

        "email": data.email
    })

    return {

        "message": "User created successfully",

        "access_token": token,

        "token_type": "bearer"
    }


# =========================
# LOGIN
# =========================

@router.post("/login")
def login(

    data: AuthInput,

    db: Session = Depends(get_db)

):

    user = get_user_by_email(

        db,

        data.email
    )

    if not user:

        return {

            "message": "User not found"
        }

    print("Entered Password: ",data.password)
    print("Stored Password: ",user.password)
    print("Length: ", len(str(user.password)))
    # VERIFY PASSWORD
    is_valid = verify_password(

        str(data.password),

        str(user.password)
    )

    if not is_valid:

        return {

            "message": "Invalid password"
        }

    # CREATE TOKEN
    token = create_access_token({

        "email": data.email
    })

    return {

        "message": "Login successful",

        "access_token": token,

        "token_type": "bearer"
    }


# =========================
# PROFILE
# =========================

@router.get("/profile")
def get_profile(

    current_user: dict = Depends(get_current_user),

    db: Session = Depends(get_db)

):
    email = current_user["email"]

    user = get_user_by_email(

        db,

        email
    )

    if not user:

        return {

            "message": "User not found"
        }

    return {

        "username": user.username,

        "email": user.email
    }