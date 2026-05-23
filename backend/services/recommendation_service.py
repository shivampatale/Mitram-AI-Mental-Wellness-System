assessment_history = []


def calculate_wellness_score(answers):

    total = sum(answers.values())

    max_score = len(answers) * 5

    percentage = (total / max_score) * 100

    return round(percentage)



def determine_risk(score):

    if score >= 75:
        return "Low"

    elif score >= 50:
        return "Medium"

    elif score >= 30:
        return "High"

    else:
        return "Critical"



def generate_recommendations(score, risk, answers=None):

    recommendations = []

    if answers is None:
        answers = {}



    # Sleep Recommendations
    if answers.get("sleep", 3) <= 2:

        recommendations.extend([
            "Maintain a consistent sleep schedule",
            "Reduce screen exposure before bedtime",
            "Aim for 7-8 hours of quality sleep"
        ])



    # Stress Recommendations
    if answers.get("stress", 0) >= 4:

        recommendations.extend([
            "Break large tasks into smaller manageable goals",
            "Take short recovery breaks during work or study",
            "Practice breathing or mindfulness exercises"
        ])



    # Anxiety Recommendations
    if answers.get("anxiety", 0) >= 4:

        recommendations.extend([
            "Try grounding techniques during anxious moments",
            "Limit overthinking triggers and negative media exposure",
            "Talk openly with trusted people"
        ])



    # Motivation Recommendations
    if answers.get("motivation", 5) <= 2:

        recommendations.extend([
            "Start with very small achievable daily goals",
            "Reward yourself after completing tasks",
            "Follow a structured daily routine"
        ])



    # Emotional Fatigue Recommendations
    if answers.get("emotional_fatigue", 0) >= 4:

        recommendations.extend([
            "Take time for relaxation and recovery",
            "Avoid continuous overworking",
            "Spend time with supportive people"
        ])



    # Risk-Based Recommendations
    if risk == "Low":

        recommendations.extend([
            "Continue maintaining healthy wellness habits",
            "Keep balancing work and personal life"
        ])


    elif risk == "Medium":

        recommendations.extend([
            "Monitor stress levels regularly",
            "Increase wellness and recovery activities"
        ])


    elif risk == "High":

        recommendations.extend([
            "Reduce excessive workload pressure",
            "Prioritize emotional recovery and self-care"
        ])


    elif risk == "Critical":

        recommendations.extend([
            "Seek support from trusted people",
            "Consider professional mental wellness consultation"
        ])



    if len(recommendations) == 0:

        recommendations.append(
            "Maintain balanced wellness habits and healthy routines"
        )



    return recommendations



def analyze_assessment(answers):

    score = calculate_wellness_score(answers)

    risk = determine_risk(score)

    recommendations = generate_recommendations(
        score,
        risk,
        answers
    )

    result = {
        "wellness_score": score,
        "risk": risk,
        "recommendations": recommendations
    }

    assessment_history.append(result)

    return result



def get_analytics():

    if not assessment_history:

        return {
            "message": "No assessment data available"
        }



    total = len(assessment_history)

    average_score = sum(
        item["wellness_score"]
        for item in assessment_history
    ) / total



    latest_score = assessment_history[-1]["wellness_score"]



    risk_history = [
        item["risk"]
        for item in assessment_history
    ]



    if latest_score > average_score:

        trend = "Improving"

    elif latest_score < average_score:

        trend = "Declining"

    else:

        trend = "Stable"



    return {
        "total_assessments": total,
        "average_score": round(average_score, 2),
        "latest_score": latest_score,
        "trend": trend,
        "risk_history": risk_history
    }