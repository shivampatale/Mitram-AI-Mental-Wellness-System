WEIGHTS = {
    "stress": -12,
    "anxiety": -10,
    "burnout": -15,
    "loneliness": -8,
    "motivation": 10,
    "emotional_fatigue": -12,
    "sleep": 8,
    "focus": 6,
    "social": 5
}


def calculate_wellness(answers):

    score = 50

    for key, value in answers.items():

        if key in WEIGHTS:
            score += WEIGHTS[key] * (value/5)

    score=max(0,min(100,round(score)))

    return score