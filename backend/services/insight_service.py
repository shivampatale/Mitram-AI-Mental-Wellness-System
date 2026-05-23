def generate_ai_insights(latest_score,average_score,risk):

    insights=[]

    if risk=="High":

        insights.append(
            "Stress levels are rising consistently."
        )

        insights.append(
            "Burnout indicators detected."
        )

        insights.append(
            "Recovery intervention is recommended."
        )

    elif risk=="Moderate":

        insights.append(
            "Wellness levels fluctuate moderately."
        )

        insights.append(
            "Maintain recovery consistency."
        )

        insights.append(
            "Sleep and focus balance should improve."
        )

    else:

        insights.append(
            "Emotional wellness is stable."
        )

        insights.append(
            "Recovery trend is positive."
        )

        insights.append(
            "Stress indicators remain controlled."
        )

    if latest_score < average_score:

        insights.append(
            "Current wellness score dropped below average."
        )

    else:

        insights.append(
            "Current wellness score is improving steadily."
        )

    return insights