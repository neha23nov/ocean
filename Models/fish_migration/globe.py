import pandas as pd
import plotly.graph_objects as go

# Load your dataset
df = pd.read_csv("fish migration oceans.csv")  # replace with your CSV path

# Create a globe with circles
fig = go.Figure()

fig.add_trace(
    go.Scattergeo(
        lon = df['lon'],
        lat = df['lat'],
        text = df.apply(lambda row: f"Species: {row['species']}<br>Month: {row['month']}<br>Route: {row['migration_route']}", axis=1),
        mode = 'markers',
        marker = dict(
            size = 5,
            color = 'cyan',
            line=dict(width=0.5, color='blue'),
            symbol='circle'
        )
    )
)

# Globe layout
fig.update_layout(
    title = 'Fish Migration Globally',
    geo = dict(
        showland = True,
        landcolor = "rgb(243, 243, 243)",
        showocean = True,
        oceancolor = "rgb(204, 224, 255)",
        projection_type = 'orthographic',  # globe view
        lonaxis_range=[-180, 180],
        lataxis_range=[-90, 90],
        showcountries=True
    )
)

fig.show()