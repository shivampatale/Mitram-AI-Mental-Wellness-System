from sqlalchemy.orm import Session

from backend.models.database_models import Assessment

from datetime import datetime


def save_assessment_db(

    db: Session,

    data
):

    assessment = Assessment(

        user_email=data["user_email"],

        wellness_score=data["wellness_score"],

        risk=data["risk"],

        insights=str(data["insights"]),

        recommendations=str(data["recommendations"]),

        created_at=datetime.now().strftime(

            "%d-%m-%Y %H:%M"
        )
    )

    db.add(assessment)

    db.commit()

    db.refresh(assessment)

    return assessment

def get_user_assessments(

    db: Session,

    email
):

    return db.query(Assessment).filter(

        Assessment.user_email == email

    ).all()