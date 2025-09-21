import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

# Load dataset
df = pd.read_csv("Water_Quality_Index/water_quality.csv")

# Separate features and target
X = df.drop("WQI", axis=1)
y = df["WQI"]

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Fit linear regression
model = LinearRegression()
model.fit(X_scaled, y)

# Get coefficients (these represent relative weights)
weights = model.coef_

# Create a DataFrame for ranking
weight_df = pd.DataFrame({
    "Feature": X.columns,
    "Weight": weights
})

# Sort by absolute value of weight (importance)
weight_df["AbsWeight"] = weight_df["Weight"].abs()
weight_df = weight_df.sort_values("AbsWeight", ascending=False)

# Display ranking
print(weight_df[["Feature", "Weight"]])
