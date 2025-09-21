import pandas as pd
df = pd.read_csv('fish migration oceans.csv')

df.head()
df.info()

# Check for missing values
print(df.isnull().sum())

# Check duplicates
print("Duplicates:", df.duplicated().sum())

# Check value distributions
print(df['species'].value_counts())
print(df['ocean'].value_counts())

# Example: Fill missing numerical values with mean
df['lat'] = df['lat'].fillna(df['lat'].mean())
df['lon'] = df['lon'].fillna(df['lon'].mean())

# Example: Fill missing categorical values with mode
df['species'] = df['species'].fillna(df['species'].mode()[0])
df['ocean'] = df['ocean'].fillna(df['ocean'].mode()[0])

df = df.drop_duplicates()
from sklearn.preprocessing import LabelEncoder

# Encode species and ocean
le_species = LabelEncoder()
df['species_encoded'] = le_species.fit_transform(df['species'])

le_ocean = LabelEncoder()
df['ocean_encoded'] = le_ocean.fit_transform(df['ocean'])

# If target is categorical (e.g., migration path), encode it too
le_target = LabelEncoder()
df['migration_route_encoded'] = le_target.fit_transform(df['migration_route'])

from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
df[['lat', 'lon']] = scaler.fit_transform(df[['lat', 'lon']])