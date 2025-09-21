# Create a dummy DataFrame for demonstration purposes
data = {
    'Latitude': [0, 10, 20, 30, 40],
    'Longitude': [0, 20, 40, 60, 80],
    'Depth_meters': [100, 200, 300, 400, 500],
    'Plastic_Type': ['Bottle', 'Bag', 'Bottle', 'Net', 'Other'],
    'Plastic_Weight_kg': [0.5, 0.1, 0.7, 1.5, 0.2]
}
df = pd.DataFrame(data)
display(df.head())

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Dummy DataFrame
data = {
    'Latitude': [0, 10, 20, 30, 40],
    'Longitude': [0, 20, 40, 60, 80],
    'Depth_meters': [100, 200, 300, 400, 500],
    'Plastic_Type': ['Bottle', 'Bag', 'Bottle', 'Net', 'Other'],
    'Plastic_Weight_kg': [0.5, 0.1, 0.7, 1.5, 0.2]
}
df = pd.DataFrame(data)

#  heatmap for plastic pollution (Lat vs Lon)
pivot_table = df.pivot_table(
    values="Plastic_Weight_kg",
    index="Latitude",
    columns="Longitude",
    aggfunc="mean"
)

# Plot heatmap
plt.figure(figsize=(8,6))
sns.heatmap(pivot_table, cmap="YlOrRd", annot=True, fmt=".2f", cbar_kws={'label': 'Plastic Weight (kg)'})
plt.title("Heatmap of Plastic Pollution (Lat vs Lon)")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()