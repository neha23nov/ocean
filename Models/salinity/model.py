import pandas as pd
df=pd.read_csv("Models/salinity/Indian_Ocean_surface_oce.tab",
               sep="\t",
               skiprows=19,
               engine="python")

print(df.head())
print(df.info())
print(df.shape)
print("above i have printed the shape")
print("Latitude range:", df["Latitude"].min(), "to", df["Latitude"].max())
print("Longitude range:", df["Longitude"].min(), "to", df["Longitude"].max())
print("Salinity range:", df["Sal"].min(), "to", df["Sal"].max())


import matplotlib.pyplot as plt

plt.scatter(df["Longitude"], df["Latitude"], c=df["Sal"], cmap="viridis", s=10)
plt.colorbar(label="Salinity (PSU)")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()
