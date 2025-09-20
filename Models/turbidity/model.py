import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error,r2_score,mean_absolute_error


try:
    df=pd.read_excel('turbidity/Dataset_Tingkat_Kekeruhan_v2.xlsx')
    print("Dataset loaded")
except:
    print("error loading dataset")
    exit()
    
print("\n Dataset info")
df.info()

df.head()


