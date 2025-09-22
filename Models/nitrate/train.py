from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import pandas as pd
from model import df

# Convert time to numeric (seconds)
df['time_numeric'] = pd.to_datetime(df['time']).view("int64") // 10**9

# Features and target
X = df[['time_numeric', 'sea_water_temperature', 'sea_water_practical_salinity']]
y = df['nitrate_concentration']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)
print("MSE:", mean_squared_error(y_test, y_pred))

# Add predictions to dataframe
df['predicted_nitrate'] = model.predict(X)
print(df[['time', 'nitrate_concentration', 'predicted_nitrate']].head())

# ✅ Save to CSV (inside public folder, accessible by React)
output_path = "C:/Users/peehu/OneDrive/Desktop/React/ocean/neerja/public/nitrate_predictions.csv"
df.to_csv(output_path, index=False)
print(f"✅ Combined real and predicted data saved to {output_path}")
