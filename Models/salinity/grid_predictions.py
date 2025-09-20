import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import json
from model import df

df=df.dropna()
df["Latitude"]=pd.to_numeric(df["Latitude"],errors="coerce")
df["Longitude"]=pd.to_numeric(df["Longitude"],errors="coerce")
df["Sal"]=pd.to_numeric(df["Sal"],errors="coerce")

X=df[["Latitude", "Longitude"]]
Y=df["Sal"]

X_train,X_test,y_train,y_test=train_test_split(X,Y,test_size=0.2,random_state=42)

model=RandomForestRegressor(n_estimators=200,random_state=42)
model.fit(X_train,y_train)

preds=model.predict(X_test)
print("mean squared error",mean_squared_error(y_test,preds))

grid=[]
lat_values=np.linspace(df["Latitude"].min(),df["Latitude"].max(),50)
lon_values=np.linspace(df["Longitude"].min(), df["Longitude"].max(), 50)

for lat in lat_values:
    for lon in lon_values:
        sal=model.predict([[lat,lon]])[0]
        grid.append({"lat": lat, "lon": lon, "sal": sal})
        

output_file="Models/salinity/salinity_predictions.json"
with open(output_file,"w") as f:
    json.dump(grid,f)
    
print(f"Prediction grid saved to {output_file}")


