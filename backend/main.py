from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.assessment import router as assessment_router
from backend.api.analytics import router as analytics_router 
from backend.database.history_store import get_history
from backend.api.auth import router as auth_router
from backend.api.login import router as login_router
from backend.api.chatbot import router as chatbot_router
from backend.database.db import engine
from backend.models.database_models import Base

Base.metadata.create_all(bind=engine)

app=FastAPI(
    title="Mitram AI",
    swagger_ui_parameters={
        "syntaxHighlight" : False
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    assessment_router,
    prefix="/api"
)

app.include_router(
    analytics_router,
    prefix="/api"
)

app.include_router(
    auth_router,
    prefix="/api"
)

app.include_router(
    login_router,
    prefix="/api"
)

app.include_router(
    chatbot_router,
    prefix="/api"
)

@app.get("/")
def home():

    return {
        "message":"Mitram AI Backend Running"
    }
