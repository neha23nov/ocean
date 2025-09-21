import seaborn as sns
from load import df
import matplotlib.pyplot as plt


corr = df.corr()

wqi_corr = corr["WQI"].sort_values(ascending=False)
print(wqi_corr)
plt.figure(figsize=(10,8))
sns.heatmap(corr, annot=True, cmap="coolwarm", fmt=".2f")
plt.title("Correlation Heatmap")
plt.show()

features = df.columns.drop("WQI")

plt.figure(figsize=(15,10))
for i, feature in enumerate(features, 1):
    plt.subplot(3, 4, i)
    plt.scatter(df[feature], df["WQI"], color='teal')
    plt.xlabel(feature)
    plt.ylabel("WQI")
plt.tight_layout()
plt.show()
