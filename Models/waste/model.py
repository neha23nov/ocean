import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error,r2_score

try:
    file_name='waste/ocean_plastic_pollution_data.csv'
    df=pd.read_csv(file_name)
    print("Data loaded successfully")
except FileNotFoundError:
    print(f"Error: The file at {file_name} was not found.")
    exit()
    
print("\n--Data Info--")
df.info()

print(df.head())

print(df.describe())