from sklearn.linear_model import LinearRegression
import numpy as np
from load import df

X = df.drop("WQI", axis=1)
y = df["WQI"]

model = LinearRegression()
model.fit(X, y)

# Coefficients
for feature, coef in zip(X.columns, model.coef_):
    print(f"{feature}: {coef:.3f}")
