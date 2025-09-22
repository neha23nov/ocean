# 
import xarray as xr

ds = xr.open_dataset("nitrate/CP01CNSM-RID26-07-NUTNRB000.nc")
print(ds)
