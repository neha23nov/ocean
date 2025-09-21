import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Path to the dataset
data_file = os.path.join(BASE_DIR, "Indian_Ocean_surface_oce.tab")
print(f"Looking for data file at: {data_file}")

# --- Load dataset ---
try:
    df = pd.read_csv(
        data_file,
        sep="\t",
        skiprows=19,
        engine="python"
    )
    print(f"✅ Loaded dataset, shape:", df.shape)
except FileNotFoundError:
    print(f"❌ Error: The data file '{data_file}' was not found.")
    exit()

# --- Clean data ---
df = df.dropna()
df["Latitude"] = pd.to_numeric(df["Latitude"], errors="coerce")
df["Longitude"] = pd.to_numeric(df["Longitude"], errors="coerce")
df["Sal"] = pd.to_numeric(df["Sal"], errors="coerce")
df = df.dropna()
print("Data after cleaning, shape:", df.shape)

if df.empty:
    print("❌ Error: DataFrame is empty after cleaning.")
    exit()

# --- Features & labels ---
X = df[["Latitude", "Longitude"]]
Y = df["Sal"]

# --- Train/test split ---
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# --- Train model ---
model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# --- Evaluate ---
preds = model.predict(X_test)
print("Mean squared error:", mean_squared_error(y_test, preds))

# --- Generate prediction grid efficiently ---
lat_values = np.linspace(df["Latitude"].min(), df["Latitude"].max(), 50)
lon_values = np.linspace(df["Longitude"].min(), df["Longitude"].max(), 50)
lat_grid, lon_grid = np.meshgrid(lat_values, lon_values)
lat_flat = lat_grid.flatten()
lon_flat = lon_grid.flatten()

grid_df = pd.DataFrame({"Latitude": lat_flat, "Longitude": lon_flat})
sal_predictions = model.predict(grid_df)
grid = [
    {"lat": lat_flat[i], "lon": lon_flat[i], "sal": float(sal_predictions[i])}
    for i in range(len(lat_flat))
]

print("Number of grid points generated:", len(grid))

# --- Save JSON ---
output_path = r"C:\Users\peehu\OneDrive\Desktop\React\ocean\neerja\public\salinity.json"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, "w") as f:
    json.dump(grid, f, indent=4)

print(f"✅ Prediction grid saved to {output_path}")
