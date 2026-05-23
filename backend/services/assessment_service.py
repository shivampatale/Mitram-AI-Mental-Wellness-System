from random import sample
from backend.utils.constants import QUESTION_BANK


assessment_history = []


def generate_questions(total=12):

    questions = []

    for category in QUESTION_BANK:

        selected = sample(
            QUESTION_BANK[category],
            min(2, len(QUESTION_BANK[category]))
        )

        for q in selected:

            questions.append({
                "category": category,
                "question": q
            })

    questions = sample(
        questions,
        min(total, len(questions))
    )

    return questions


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


def generate_recommendations(risk):

    recommendations = {

        "Low": [

            "Maintain your current healthy routine",
            "Continue practicing positive wellness habits",
            "Stay socially connected with supportive people",
            "Keep a balanced sleep schedule",
            "Continue regular physical activity",
            "Practice gratitude and mindfulness regularly",
            "Take periodic breaks to maintain emotional balance",
            "Maintain productivity without overworking yourself"

        ],

        "Medium": [

            "Take short mental breaks during work or study",
            "Improve sleep consistency and screen-time habits",
            "Practice stress management techniques daily",
            "Spend more time on hobbies and relaxation",
            "Avoid excessive workload accumulation",
            "Increase hydration and healthy eating habits",
            "Engage in mindfulness or breathing exercises",
            "Reach out to supportive friends or family members",
            "Reduce multitasking to improve mental clarity",
            "Create a healthier daily routine"

        ],

        "High": [

            "Reduce workload pressure where possible",
            "Take recovery breaks throughout the day",
            "Avoid emotional isolation and seek social support",
            "Practice meditation or relaxation exercises",
            "Improve sleep quality and reduce late-night stress",
            "Limit exposure to overwhelming environments",
            "Spend time on activities that improve emotional recovery",
            "Track emotional patterns and burnout indicators",
            "Speak with a mentor, counselor, or trusted person",
            "Focus on rebuilding motivation gradually"

        ],

        "Critical": [

            "Reach out to trusted people for emotional support",
            "Seek professional mental health support if distress persists",
            "Avoid isolating yourself during difficult periods",
            "Take immediate steps to reduce emotional overload",
            "Prioritize rest, recovery, and emotional stabilization",
            "Reduce unnecessary pressure and stressful commitments",
            "Follow a healthier sleep and recovery schedule",
            "Practice grounding and breathing techniques",
            "Avoid burnout triggers and emotionally draining situations",
            "Consider professional wellness consultation if symptoms continue",
            "Focus on self-care and emotional recovery activities",
            "Stay connected with supportive communities and relationships"

        ]
    }

    return recommendations[risk]


def analyze_assessment(answers):

    score = calculate_wellness_score(answers)

    risk = determine_risk(score)

    recommendations = generate_recommendations(risk)

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