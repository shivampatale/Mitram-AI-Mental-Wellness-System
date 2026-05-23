import pandas as pd
import random

data = []

for _ in range(2000):

    stress = random.randint(1, 10)

    anxiety = random.randint(1, 10)

    burnout = random.randint(1, 10)

    loneliness = random.randint(1, 10)

    motivation = random.randint(1, 10)

    emotional_fatigue = random.randint(1, 10)

    sleep = random.randint(1, 10)

    focus = random.randint(1, 10)

    social = random.randint(1, 10)

    neutral = random.randint(1, 10)


    risk_score = (

        stress +
        anxiety +
        burnout +
        loneliness +
        emotional_fatigue

    ) - (

        motivation +
        sleep +
        focus +
        social +
        neutral

    )


    if risk_score >= 15:

        risk = "High"

    elif risk_score >= 5:

        risk = "Moderate"

    else:

        risk = "Low"


    data.append([

        stress,
        anxiety,
        burnout,
        loneliness,
        motivation,
        emotional_fatigue,
        sleep,
        focus,
        social,
        neutral,
        risk
    ])


columns = [

    "stress",
    "anxiety",
    "burnout",
    "loneliness",
    "motivation",
    "emotional_fatigue",
    "sleep",
    "focus",
    "social",
    "neutral",
    "risk"
]


df = pd.DataFrame(data, columns=columns)

df.to_csv("dataset.csv", index=False)

print("Dataset generated successfully!")