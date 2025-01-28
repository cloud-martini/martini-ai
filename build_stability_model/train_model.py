import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler

# Create example dataset
data = pd.DataFrame({
    "unit_test_rate": [0.9, 0.85, 0.95, 0.8, 0.93, 0.7, 0.88, 0.75],
    "integration_test_rate": [0.9, 0.7, 0.92, 0.5, 0.85, 0.6, 0.8, 0.65],
    "e2e_test_rate": [0.9, 0.6, 0.88, 0.4, 0.91, 0.5, 0.7, 0.55],
    "code_coverage": [0.85, 0.8, 0.9, 0.7, 0.88, 0.65, 0.75, 0.6],
    "stable": [1, 0, 1, 0, 1, 0, 1, 0],
})

# Features (X) and Labels (y)
X = data[["unit_test_rate", "integration_test_rate", "e2e_test_rate", "code_coverage"]]
y = data["stable"]

# Normalize the features
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# Split into training and testing datasets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Build the TensorFlow model
model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(X_train.shape[1],)),
    tf.keras.layers.Dense(64, activation="relu"),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")  # Binary output
])

model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

# Train the model
model.fit(X_train, y_train, validation_split=0.2, epochs=50, batch_size=8, verbose=1)

# Evaluate the model
test_loss, test_accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f"Test Accuracy: {test_accuracy:.2f}")

# Save the model for Node.js
model.save("build_stability_model")
print("Model saved as 'build_stability_model'")