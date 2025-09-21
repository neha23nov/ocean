# !pip install folium
import folium
import pandas as pd
import random
from folium.plugins import MarkerCluster

# Load dataset
df = pd.read_csv("fish_migration/fish_migration_oceans.csv")

print(df.head())
print(df.info())

# Create base map (world view)
m = folium.Map(location=[0, 0], zoom_start=2)

# Generate unique color for each species
unique_species = df['species'].unique()
colors = ["#" + ''.join([random.choice('0123456789ABCDEF') for j in range(6)]) for i in range(len(unique_species))]
species_colors = dict(zip(unique_species, colors))

# Add clustered markers
marker_cluster = MarkerCluster().add_to(m)

for idx, row in df.iterrows():
    folium.CircleMarker(
        location=[row['lat'], row['lon']],
        radius=5,
        popup=f"Species: {row['species']}<br>Month: {row['month']}<br>Route: {row['migration_route']}",
        color=species_colors[row['species']],
        fill=True,
        fill_color=species_colors[row['species']]
    ).add_to(marker_cluster)

# Show map in Jupyter or save as HTML
m.save("fish_migration_map.html")
