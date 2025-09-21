import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from model import df
import json

# Features and target
X = df[['LDR1', 'LDR2', 'LDR3', 'LDR4', 'LDR5']]
y = df['Status Kekeruhan']

# Encode target
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(X, y_encoded)
print("Model training complete.")

# Create a grid of lat/lon points
lat_grid = np.arange(-90, 90, 5)
lon_grid = np.arange(-180, 180, 5)
new_points = pd.DataFrame([(lat, lon) for lat in lat_grid for lon in lon_grid],
                          columns=['Latitude', 'Longitude'])

# Create dummy LDR features for prediction
dummy_features = pd.DataFrame(np.random.rand(len(new_points), 5),
                              columns=['LDR1', 'LDR2', 'LDR3', 'LDR4', 'LDR5'])
X_predict = dummy_features

# Make predictions
predictions_encoded = model.predict(X_predict)
predictions_status = le.inverse_transform(predictions_encoded)
new_points['predicted_status'] = predictions_status

# Export to JSON
data_to_export = []
for index, row in new_points.iterrows():
    data_to_export.append({
        "latitude": row['Latitude'],
        "longitude": row['Longitude'],
        "status": row['predicted_status']
    })

json_file_path = r"C:\Users\peehu\OneDrive\Desktop\React\ocean\neerja\public\turbidity.json"
with open(json_file_path, 'w') as f:
    json.dump(data_to_export, f, indent=4)

print('Turbidity data saved to JSON file.')
