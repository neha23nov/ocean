import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from model import df

X = df[['Latitude', 'Longitude', 'Depth_meters', 'Plastic_Type']]
y = df['Plastic_Weight_kg']

# Use OneHotEncoder to ensure consistent encoding for training and prediction
encoder = OneHotEncoder(handle_unknown='ignore', drop='first')
X_encoded = encoder.fit_transform(X[['Plastic_Type']])

# Get the feature names for the encoded columns
encoded_feature_names = encoder.get_feature_names_out(['Plastic_Type'])
X_final = pd.concat([X.drop(columns=['Plastic_Type']), pd.DataFrame(X_encoded.toarray(), columns=encoded_feature_names)], axis=1)

# --- Part 2: Train the Model ---
X_train, X_test, y_train, y_test = train_test_split(X_final, y, test_size=0.2, random_state=42)
model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

print("\nModel training complete.")

# --- Part 3: Create a prediction grid and predict ---
lat_grid = np.arange(-90, 90, 5)
lon_grid = np.arange(-180, 180, 5)

# Create all combinations of lat/lon
new_points = pd.DataFrame([(lat, lon) for lat in lat_grid for lon in lon_grid], columns=['Latitude', 'Longitude'])

# Create dummy values for the model's features
new_points['Depth_meters'] = 0
new_points['Plastic_Type'] = 'Other'

# Use the fitted encoder to transform the new data, ensuring the columns are correct
new_points_encoded = encoder.transform(new_points[['Plastic_Type']])
new_points_encoded_df = pd.DataFrame(new_points_encoded.toarray(), columns=encoded_feature_names)

# Combine numerical and encoded features
new_points_final = pd.concat([new_points[['Latitude', 'Longitude', 'Depth_meters']], new_points_encoded_df], axis=1)

# Predict plastic weight for these new points
new_points['predicted_weight'] = model.predict(new_points_final)

# --- Part 4: Combine data and export to JSON ---
df_real = df[['Latitude', 'Longitude', 'Plastic_Weight_kg']].copy()
df_real = df_real.rename(columns={'Plastic_Weight_kg': 'weight'})
df_real['source'] = 'real'

new_points_final_df = new_points[['Latitude', 'Longitude', 'predicted_weight']].copy()
new_points_final_df = new_points_final_df.rename(columns={'predicted_weight': 'weight'})
new_points_final_df['source'] = 'predicted'

final_data = pd.concat([df_real, new_points_final_df], ignore_index=True)
final_data.to_json('globe_data.json', orient='records')

print("\nCombined real and predicted data saved to 'globe_data.json'.")