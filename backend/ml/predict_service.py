import joblib
import pandas as pd


model = joblib.load(
    "backend/ml/mental_wellness_model.pkl"
)


def predict_mental_health(data):

    input_data = pd.DataFrame([{

        "stress": data.get("stress", 0),

        "anxiety": data.get("anxiety", 0),

        "burnout": data.get("burnout", 0),

        "loneliness": data.get("loneliness", 0),

        "motivation": data.get("motivation", 0),

        "emotional_fatigue": data.get("emotional_fatigue", 0),

        "sleep": data.get("sleep", 0),

        "focus": data.get("focus", 0),

        "social": data.get("social", 0),

        "neutral": data.get("neutral", 0)

    }])

    prediction = model.predict(input_data)

    return prediction[0]