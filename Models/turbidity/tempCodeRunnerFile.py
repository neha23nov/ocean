import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from model import df


X = df[['LDR1', 'LDR2', 'LDR3', 'LDR4', 'LDR5']]
y = df['Status Kekeruhan']


l=LabelEncoder()
y_encoded=l.fit_transform(y)

model=RandomForestClassifier(n_estimators=100,random_state=42,n_jobs=-1)
model.fit(X,y_encoded)

print("Model training complete.")


lat_grid=np.arange(-90,90,5)
lon_grid=np.arange(-180,180,5)

new_points=pd.DataFrame([(lat,lon) for lat in lat_grid for lon in lon_grid],column=['Latitude','Longitude'])

dummy_features=pd.DataFrame(np.random.rand(len(new_points),5),columns=['LDR1', 'LDR2', 'LDR3', 'LDR4', 'LDR5'])
X_predict=dummy_features

predictions_encoded=model.predict(X_predict)
predictions_status=l.inverse_transform(predictions_encoded)

new_points['predicted_status']=predictions_status

data_to_export=[]
for index,row in new_points.iterrows():
    data_to_export.append({
        "latitude": row['Latitude'],
        "longitude": row['Longitude'],
        "status": row['predicted_status']
    })

with open('turbidity_data.json','w') as f:
    json.dump(data_to_export,f)
    
print('Turbididty data saved to json file')