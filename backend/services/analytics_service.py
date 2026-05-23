from backend.database.history_store import get_history

def generate_analytics(email):

    assessment_history = get_history(email)
    total=len(assessment_history)

    if total==0:

        return {

            "average_score":0,

            "total_assessments":0,

            "high_risk_count":0,

            "moderate_risk_count":0,

            "low_risk_count":0
        }

    average_score=sum(
        item["wellness_score"]
        for item in assessment_history
    ) / total


    high_risk=len([
        item for item in assessment_history
        if item["risk"]=="High"
    ])


    moderate_risk=len([
        item for item in assessment_history
        if item["risk"]=="Moderate"
    ])


    low_risk=len([
        item for item in assessment_history
        if item["risk"]=="Low"
    ])


    return {

        "average_score":round(average_score,1),

        "total_assessments":total,

        "high_risk_count":high_risk,

        "moderate_risk_count":moderate_risk,

        "low_risk_count":low_risk,

        "history":assessment_history
    }