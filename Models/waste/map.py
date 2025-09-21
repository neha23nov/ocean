import folium
from folium.plugins import HeatMap
import pandas as pd

# Dummy DataFrame
data = {
    'Latitude': [0, 10, 20, 30, 40],
    'Longitude': [0, 20, 40, 60, 80],
    'Depth_meters': [100, 200, 300, 400, 500],
    'Plastic_Type': ['Bottle', 'Bag', 'Bottle', 'Net', 'Other'],
    'Plastic_Weight_kg': [0.5, 0.1, 0.7, 1.5, 0.2]
}
df = pd.DataFrame(data)

# Define threshold for polluted vs clean
threshold = 0.5
df['Pollution_Status'] = df['Plastic_Weight_kg'].apply(
    lambda x: "Polluted" if x > threshold else "Clean"
)

# Create a Folium map centered around mean location
m = folium.Map(location=[df['Latitude'].mean(), df['Longitude'].mean()], zoom_start=2)

# Add clean points (green)
for _, row in df[df['Pollution_Status']=="Clean"].iterrows():
    folium.CircleMarker(
        location=[row['Latitude'], row['Longitude']],
        radius=6,
        color="green",
        fill=True,
        fill_color="green",
        fill_opacity=0.6,
        popup=f"Clean | Weight: {row['Plastic_Weight_kg']}kg"
    ).add_to(m)

# Add polluted points (red)
for _, row in df[df['Pollution_Status']=="Polluted"].iterrows():
    folium.CircleMarker(
        location=[row['Latitude'], row['Longitude']],
        radius=6,
        color="red",
        fill=True,
        fill_color="red",
        fill_opacity=0.6,
        popup=f"Polluted | Weight: {row['Plastic_Weight_kg']}kg"
    ).add_to(m)

# Optionally: Add HeatMap layer based on pollution weight
heat_data = df[['Latitude', 'Longitude', 'Plastic_Weight_kg']].values.tolist()
HeatMap(heat_data, radius=25, blur=15, max_zoom=5).add_to(m)

# Save and display map
m.save("pollution_map.html")
m
