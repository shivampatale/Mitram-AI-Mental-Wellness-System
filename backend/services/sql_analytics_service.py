def generate_sql_analytics(history):

    total = len(history)

    if total == 0:

        return {

            "average_score": 0,

            "total_assessments": 0,

            "high_risk_count": 0,

            "moderate_risk_count": 0,

            "low_risk_count": 0,

            "history": []
        }

    average_score = round(

        sum(item.wellness_score for item in history) / total,

        2
    )

    high_risk_count = len(

        [x for x in history if x.risk == "High"]
    )

    moderate_risk_count = len(

        [x for x in history if x.risk == "Moderate"]
    )

    low_risk_count = len(

        [x for x in history if x.risk == "Low"]
    )

    history_data = []

    for item in history:

        history_data.append({

            "wellness_score": item.wellness_score,

            "risk": item.risk,

            "created_at": item.created_at
        })

    return {

        "average_score": average_score,

        "total_assessments": total,

        "high_risk_count": high_risk_count,

        "moderate_risk_count": moderate_risk_count,

        "low_risk_count": low_risk_count,

        "history": history_data
    }