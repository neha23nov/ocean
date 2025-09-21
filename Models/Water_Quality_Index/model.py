import matplotlib.pyplot as plt
from load import df

df.hist(bins=15, figsize=(15,10), color='skyblue', edgecolor='black')
plt.suptitle("Feature Distributions", fontsize=16)
plt.show()
