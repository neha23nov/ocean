import pandas as pd
from fish import df

df = pd.read_csv("fish_migration/fish_migration_oceans.csv")
df.to_json("C:/Users/peehu/OneDrive/Desktop/React/ocean/neerja/public/fish_migration_oceans.json", orient="records")
