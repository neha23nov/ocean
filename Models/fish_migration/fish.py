import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# --- Load dataset ---
df = pd.read_csv('fish_migration/fish_migration_oceans.csv')

# Quick info
print(df.head())
print(df.info())

# Check for missing values
print(df.isnull().sum())

# Check duplicates
print("Duplicates:", df.duplicated().sum())

# Check value distributions
print(df['species'].value_counts())
print(df['ocean'].value_counts())

# --- Handle missing values ---
df['lat'] = df['lat'].fillna(df['lat'].mean())
df['lon'] = df['lon'].fillna(df['lon'].mean())
df['species'] = df['species'].fillna(df['species'].mode()[0])
df['ocean'] = df['ocean'].fillna(df['ocean'].mode()[0])

df = df.drop_duplicates()

# --- Encode categorical features ---
le_species = LabelEncoder()
df['species_encoded'] = le_species.fit_transform(df['species'])

le_ocean = LabelEncoder()
df['ocean_encoded'] = le_ocean.fit_transform(df['ocean'])

le_target = LabelEncoder()
df['migration_route_encoded'] = le_target.fit_transform(df['migration_route'])

# --- Scale numerical features ---
scaler = StandardScaler()
df[['lat', 'lon']] = scaler.fit_transform(df[['lat', 'lon']])

# --- Split dataset ---
X = df.drop('migration_route_encoded', axis=1)
y = df['migration_route_encoded']

X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

print("Train shape:", X_train.shape, y_train.shape)
print("Validation shape:", X_val.shape, y_val.shape)
print("Test shape:", X_test.shape, y_test.shape)

# --- Logistic Regression Model ---
model_lr = LogisticRegression(max_iter=1000)
X_train_numeric = X_train.drop(['species', 'ocean', 'migration_route', 'id'], axis=1)
X_val_numeric = X_val.drop(['species', 'ocean', 'migration_route', 'id'], axis=1)

model_lr.fit(X_train_numeric, y_train)

y_val_pred = model_lr.predict(X_val_numeric)
print("Validation Accuracy (LogReg):", accuracy_score(y_val, y_val_pred))
print(classification_report(y_val, y_val_pred))

# --- Random Forest Model ---
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)

X_train_numeric = X_train.drop(['species', 'ocean', 'migration_route', 'id'], axis=1)
X_val_numeric = X_val.drop(['species', 'ocean', 'migration_route', 'id'], axis=1)

rf_model.fit(X_train_numeric, y_train)

y_val_pred_rf = rf_model.predict(X_val_numeric)
print("Validation Accuracy (RF):", accuracy_score(y_val, y_val_pred_rf))
print(classification_report(y_val, y_val_pred_rf))

# --- Training Accuracy Check ---
y_train_pred = rf_model.predict(X_train_numeric)
train_accuracy = accuracy_score(y_train, y_train_pred)
print("Training Accuracy (RF):", train_accuracy)
