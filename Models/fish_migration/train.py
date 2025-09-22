from sklearn.model_selection import train_test_split
from fish import df

# Features and target
X = df.drop('migration_route_encoded', axis=1)  # or your target column
y = df['migration_route_encoded']

# First, split train (70%) and temp (30%)
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Split temp into validation (15%) and test (15%)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, test_size=0.5, random_state=42
)

print("Train shape:", X_train.shape, y_train.shape)
print("Validation shape:", X_val.shape, y_val.shape)
print("Test shape:", X_test.shape, y_test.shape)

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Initialize model
model_lr = LogisticRegression(max_iter=1000)

# Drop non-numeric columns from X_train
X_train_numeric = X_train.drop(['species', 'ocean', 'migration_route', 'id'], axis=1)
X_val_numeric = X_val.drop(['species', 'ocean', 'migration_route', 'id'], axis=1)


# Train
model_lr.fit(X_train_numeric, y_train)

# Validate
y_val_pred = model_lr.predict(X_val_numeric)
print("Validation Accuracy:", accuracy_score(y_val, y_val_pred))
print(classification_report(y_val, y_val_pred))

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Initialize model
model_rf = RandomForestClassifier(n_estimators=100, random_state=42)

# Drop non-numeric columns
X_train_numeric = X_train.drop(['species', 'ocean', 'migration_route', 'id'], axis=1)
X_val_numeric = X_val.drop(['species', 'ocean', 'migration_route', 'id'], axis=1)

# Train
model_rf.fit(X_train_numeric, y_train)

# Validate
y_val_pred_rf = model_rf.predict(X_val_numeric)
print("Validation Accuracy (RF):", accuracy_score(y_val, y_val_pred_rf))
print(classification_report(y_val, y_val_pred_rf))

from sklearn.ensemble import RandomForestClassifier

# Initialize model
rf_model = RandomForestClassifier(
    n_estimators=100,  # number of trees
    max_depth=None,    # expand until leaves are pure
    random_state=42
)

# Drop non-numeric columns from X_train
X_train_numeric = X_train.drop(['species', 'ocean', 'migration_route', 'id'], axis=1)

# Train on training set
rf_model.fit(X_train_numeric, y_train)

# Track basic metrics on training set
from sklearn.metrics import accuracy_score

y_train_pred = rf_model.predict(X_train_numeric)
train_accuracy = accuracy_score(y_train, y_train_pred)
print("Training Accuracy:", train_accuracy)

# Compare train and validation accuracy
train_acc = accuracy_score(y_train, best_rf.predict(X_train.drop(['species', 'ocean', 'migration_route', 'id'], axis=1)))

print("Train Accuracy:", train_acc)