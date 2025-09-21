## !pip install plotly
import plotly.graph_objects as go

## !pip install pydeck
## !jupyter nbextension install --sys-prefix --symlink --overwrite --py pydeck
## !jupyter nbextension enable --sys-prefix --py pydeck

##Rotating Globe

import pandas as pd
import plotly.graph_objects as go
import numpy as np

# Dummy Data
data = {
    'Latitude': [0, 10, 20, 30, 40],
    'Longitude': [0, 20, 40, 60, 80],
    'Plastic_Weight_kg': [0.5, 0.1, 0.7, 1.5, 0.2]
}
df = pd.DataFrame(data)

# Threshold for clean vs polluted
threshold = 0.5
df['Pollution_Status'] = df['Plastic_Weight_kg'].apply(
    lambda x: "Polluted" if x > threshold else "Clean"
)
colors = df['Pollution_Status'].map({"Clean": "green", "Polluted": "red"})

# Create base figure
fig = go.Figure()

fig.add_trace(go.Scattergeo(
    lon = df['Longitude'],
    lat = df['Latitude'],
    text = df['Pollution_Status'] + " | " + df['Plastic_Weight_kg'].astype(str) + " kg",
    mode = 'markers',
    marker=dict(size=8, color=colors)
))

# Create frames for rotation
frames = []
for lon in np.linspace(-180, 180, 60):  # 60 steps for smooth rotation
    frames.append(go.Frame(layout=dict(
        geo=dict(projection_rotation=dict(lon=lon))
    )))

fig.frames = frames

# Update layout with animation controls
fig.update_geos(
    projection_type="orthographic",  # Globe effect
    showland=True, landcolor="rgb(220, 220, 220)",
    showocean=True, oceancolor="rgb(150, 200, 255)",
    projection_rotation=dict(lon=0, lat=0)
)

fig.update_layout(
    title="Rotating Globe: Plastic Pollution Observations",
    height=700,
    margin={"r":0,"t":30,"l":0,"b":0},
    updatemenus=[{
        "type": "buttons",
        "buttons": [
            {"label": "▶ Play", "method": "animate", "args": [None, {"frame": {"duration": 100, "redraw": True}, "fromcurrent": True}]},
            {"label": "⏸ Pause", "method": "animate", "args": [[None], {"frame": {"duration": 0, "redraw": False}, "mode": "immediate"}]}
        ]
    }]
)

fig.show()

## Spinning Globe
import pandas as pd
import plotly.graph_objects as go
import numpy as np

# Dummy Data
data = {
    'Latitude': [0, 10, 20, 30, 40],
    'Longitude': [0, 20, 40, 60, 80],
    'Plastic_Weight_kg': [0.5, 0.1, 0.7, 1.5, 0.2]
}
df = pd.DataFrame(data)

# Threshold for clean vs polluted
threshold = 0.5
df['Pollution_Status'] = df['Plastic_Weight_kg'].apply(
    lambda x: "Polluted" if x > threshold else "Clean"
)
colors = df['Pollution_Status'].map({"Clean": "green", "Polluted": "red"})

# Create base figure
fig = go.Figure()

fig.add_trace(go.Scattergeo(
    lon=df['Longitude'],
    lat=df['Latitude'],
    text=df['Pollution_Status'] + " | " + df['Plastic_Weight_kg'].astype(str) + " kg",
    mode='markers',
    marker=dict(size=8, color=colors)
))

# Generate continuous rotation frames
frames = []
for lon in np.linspace(0, 360, 120):  # 120 frames for smooth loop
    frames.append(go.Frame(layout=dict(
        geo=dict(projection_rotation=dict(lon=lon))
    )))

fig.frames = frames

# Layout for auto-play
fig.update_geos(
    projection_type="orthographic", 
    showland=True, landcolor="rgb(220, 220, 220)",
    showocean=True, oceancolor="rgb(150, 200, 255)",
    projection_rotation=dict(lon=0, lat=0)
)

fig.update_layout(
    title="🌍 Moving Globe: Plastic Pollution Observations",
    height=700,
    margin={"r":0,"t":30,"l":0,"b":0},
    updatemenus=[{
        "type": "buttons",
        "showactive": False,
        "buttons": [
            {"label": "▶ Auto-Spin", 
             "method": "animate", 
             "args": [None, {
                 "frame": {"duration": 100, "redraw": True},
                 "fromcurrent": True,
                 "mode": "immediate",
                 "transition": {"duration": 0}
             }]
            }
        ]
    }]
)

# Auto-start animation (simulated click on play)
fig.update_layout(autosize=True)
fig.show()

