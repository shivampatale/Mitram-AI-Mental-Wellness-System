def predict_risk(score):

    if score >= 80:
        return "Low"

    elif score >= 60:
        return "Medium"

    elif score >= 40:
        return "High"

    return "Critical"