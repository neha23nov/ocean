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

# --- Try loading the dataset ---
try:
    df = pd.read_csv(
        data_file,
        sep="\t",
        skiprows=19,
        engine="python"
    )
    print(f"✅ Loaded dataset from {data_file}, shape:", df.shape)
except FileNotFoundError:
    print(f"❌ Error: The data file '{data_file}' was not found.")
    exit()

# --- Clean and preprocess ---
df = df.dropna()
df["Latitude"] = pd.to_numeric(df["Latitude"], errors="coerce")
df["Longitude"] = pd.to_numeric(df["Longitude"], errors="coerce")
df["Sal"] = pd.to_numeric(df["Sal"], errors="coerce")
df = df.dropna()  # Drop any rows with NaN after conversion
print("Data after cleaning, shape:", df.shape)

if df.empty:
    print("❌ Error: DataFrame is empty after cleaning. No JSON will be created.")
    exit()

# --- Features and labels ---
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

# --- Generate prediction grid ---
grid = []
lat_values = np.linspace(df["Latitude"].min(), df["Latitude"].max(), 50)
lon_values = np.linspace(df["Longitude"].min(), df["Longitude"].max(), 50)

for lat in lat_values:
    for lon in lon_values:
        new_data = pd.DataFrame([[lat, lon]], columns=["Latitude", "Longitude"])
        sal = model.predict(new_data)[0]
        grid.append({"lat": lat, "lon": lon, "sal": sal})

print("Number of grid points generated:", len(grid))

# --- Save JSON ---
output_dir = os.path.join(BASE_DIR, "output")        # Define output folder
output_file = os.path.join(output_dir, "salinity_grid.json")  # Define JSON file path

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

with open(output_file, "w") as f:
    json.dump(grid, f)

print(f"✅ Prediction grid saved to {output_file}")
