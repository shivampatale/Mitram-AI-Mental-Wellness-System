import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import accuracy_score

import joblib


# Load Dataset

df = pd.read_csv("dataset.csv")


# Features

X = df[[
    "stress",
    "anxiety",
    "burnout",
    "loneliness",
    "motivation",
    "emotional_fatigue",
    "sleep",
    "focus",
    "social",
    "neutral"
]]


# Target

y = df["risk"]


# Split Dataset

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.2,

    random_state=42
)


# Create Model

model = RandomForestClassifier(

    n_estimators=100,

    random_state=42
)


# Train Model

model.fit(X_train, y_train)


# Predictions

predictions = model.predict(X_test)


# Accuracy

accuracy = accuracy_score(

    y_test,
    predictions
)

print(f"Model Accuracy: {accuracy * 100:.2f}%")


# Save Model

joblib.dump(

    model,

    "mental_wellness_model.pkl"
)

print("Model saved successfully!")