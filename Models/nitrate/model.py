import xarray as xr
import pandas as pd

# Load dataset
ds = xr.open_dataset("nitrate/CP01CNSM-RID26-07-NUTNRB000.nc")

# Convert to DataFrame
df = ds.to_dataframe().reset_index()

# Add lat/lon columns from attributes
df['lat'] = ds.attrs['lat']
df['lon'] = ds.attrs['lon']

# Keep only the columns you need
df = df[['time', 'lat', 'lon', 'sea_water_temperature', 'sea_water_practical_salinity', 'nitrate_concentration']]

# Drop missing values
df = df.dropna()

print(df.head())
