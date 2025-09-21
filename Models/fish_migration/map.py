## !pip install folium
import folium
import pandas as pd

import pandas as pd
df = pd.read_csv('fish migration oceans.csv')

df.head()
df.info()

# Create base map
m = folium.Map(location=[0, 0], zoom_start=2)  # world view

# Add markers for each row
for idx, row in df.iterrows():
    folium.CircleMarker(
        location=[row['lat'], row['lon']],
        radius=5,
        popup=f"Species: {row['species']}\nMonth: {row['month']}\nRoute: {row['migration_route']}",
        color='blue',
        fill=True,
        fill_color='cyan'
    ).add_to(m)

# Display map
m

import random

# Generate a color for each unique species
unique_species = df['species'].unique()
colors = ["#" + ''.join([random.choice('0123456789ABCDEF') for j in range(6)]) for i in range(len(unique_species))]
species_colors = dict(zip(unique_species, colors))


for idx, row in df.iterrows():
    folium.CircleMarker(
        location=[row['lat'], row['lon']],
        radius=5,
        popup=f"Species: {row['species']}\nMonth: {row['month']}\nRoute: {row['migration_route']}",
        color=species_colors[row['species']],
        fill=True,
        fill_color=species_colors[row['species']]
    ).add_to(m)

    from folium.plugins import MarkerCluster
marker_cluster = MarkerCluster().add_to(m)

for idx, row in df.iterrows():
    folium.Marker(
        location=[row['lat'], row['lon']],
        popup=f"{row['species']} ({row['migration_route']})"
    ).add_to(marker_cluster)
