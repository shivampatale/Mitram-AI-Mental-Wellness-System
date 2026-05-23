from fastapi import APIRouter
from backend.services.assessment_service import generate_questions
from backend.database.history_store import get_history
from backend.services.insight_service import generate_ai_insights
from backend.dependencies.auth_dependency import get_current_user
from fastapi import Depends

router=APIRouter()

@router.get('/questions')
def get_questions():

    questions=generate_questions()

    return {
        "questions":questions
    }

@router.get("/latest-assessment")
def latest_assessment(current_user: dict = Depends(get_current_user)):
    email = current_user
    history = get_history(email)

    if len(history) == 0:

        return {
            "wellness_score": 0,
            "risk": "No Data",
            "insights": [],
            "recommendations":[]
        }

    latest = history[-1]

    average_score = sum(
        item["wellness_score"]
        for item in history
    ) / len(history)

    insights = generate_ai_insights(
        latest["wellness_score"],
        average_score,
        latest["risk"]
    )

    return {
        "wellness_score": latest["wellness_score"],
        "risk": latest["risk"],
        "created_at": latest["created_at"],
        "insights": insights
    }

@router.get("/history")
def history(current_user: dict = Depends(get_current_user)):
    email = current_user
    return get_history(email)