from fastapi import APIRouter

from backend.models.assessment import AssessmentInput
from backend.services.wellness_service import calculate_wellness
from backend.services.risk_service import predict_risk
from backend.services.recommendation_service import generate_recommendations
from backend.database.history_store import save_assessment
from backend.services.analytics_service import generate_analytics
from backend.database.history_store import get_history
from backend.services.insight_service import generate_ai_insights
from fastapi.responses import FileResponse
from backend.services.pdf_service import generate_pdf_report
from backend.ml.predict_service import predict_mental_health
from sqlalchemy.orm import Session
from fastapi import Depends
from backend.database.db_session import get_db
from backend.database.assessment_db import save_assessment_db
from backend.database.assessment_db import get_user_assessments
from backend.services.sql_analytics_service import generate_sql_analytics
from backend.dependencies.auth_dependency import get_current_user

router=APIRouter()


@router.post('/analyze')
def analyze(
    data:AssessmentInput,

    db: Session = Depends(get_db)
    ):

    score=calculate_wellness(
        data.answers
    )

    risk=predict_mental_health(data.answers)


    history=get_history(data.email)

    average_score=score

    if len(history)>0:

        average_score=sum(
            item["wellness_score"]
            for item in history
        ) / len(history)


    insights=generate_ai_insights(
        score,
        average_score,
        risk
    )


    recommendations=generate_recommendations(
        score,
        risk,
        data.answers
    )

    result={
        "wellness_score":score,
        "risk":risk,
        "recommendations":recommendations,
        "insights":insights
    }

    result["user_email"]=data.email
    
    save_assessment(result)

    save_assessment_db(db, result)

    return result


@router.get('/analytics')
def analytics(
    email:str = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):
    
    history = get_user_assessments(
        db,
        email
    )

    return generate_sql_analytics(history)


@router.post("/download-report")
def download_report(data: dict):

    filename = "mitram_report.pdf"

    generate_pdf_report(
        data,
        filename
    )

    return FileResponse(
        path=filename,
        filename="Mitram_AI_Report.pdf",
        media_type="application/pdf"
    )