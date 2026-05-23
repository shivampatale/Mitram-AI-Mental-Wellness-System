import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier

from sklearn.tree import DecisionTreeClassifier

from sklearn.linear_model import LogisticRegression

from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    ConfusionMatrixDisplay
)

import matplotlib.pyplot as plt


# --------------------------------------------
# Load Dataset
# --------------------------------------------


df = pd.read_csv("dataset.csv")


# --------------------------------------------
# Features and Labels
# --------------------------------------------

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


y = df["risk"]


# --------------------------------------------
# Split Dataset
# --------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# --------------------------------------------
# Models
# --------------------------------------------

models = {
    "Random Forest": RandomForestClassifier(
        n_estimators=100,
        random_state=42
    ),

    "Decision Tree": DecisionTreeClassifier(
        random_state=42
    ),

    "Logistic Regression": LogisticRegression(
        max_iter=1000
    )
}


accuracies = {}


# --------------------------------------------
# Train and Evaluate Models
# --------------------------------------------

for name, model in models.items():

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    accuracies[name] = accuracy * 100

    print(f"{name} Accuracy: {accuracy * 100:.2f}%")


# --------------------------------------------
# Accuracy Comparison Chart
# --------------------------------------------

plt.figure(figsize=(8, 6))

plt.bar(
    accuracies.keys(),
    accuracies.values()
)

plt.xlabel("Algorithms")

plt.ylabel("Accuracy (%)")

plt.title("Algorithm Accuracy Comparison")

plt.ylim(0, 100)

plt.tight_layout()

plt.savefig("algorithm_accuracy_comparison.png")

plt.show()


# --------------------------------------------
# Confusion Matrix for Random Forest
# --------------------------------------------

rf_model = models["Random Forest"]

rf_predictions = rf_model.predict(X_test)

cm = confusion_matrix(
    y_test,
    rf_predictions
)


disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=rf_model.classes_
)


fig, ax = plt.subplots(figsize=(7, 7))


disp.plot(ax=ax)

plt.title("Random Forest Confusion Matrix")

plt.tight_layout()

plt.savefig("random_forest_confusion_matrix.png")

plt.show()


print("\nCharts generated successfully!")