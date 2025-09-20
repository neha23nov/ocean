import matplotlib.pyplot as plt
import seaborn as sns
from model import df

sns.set_style("whitegrid")

print("\n total plastic weight per ocean region")
plastic_by_region=df.groupby('Region')['Plastic_Weight_kg'].sum().sort_values(ascending=False)
print(plastic_by_region)

plt.figure(figsize=(10,6))
sns.barplot(x=plastic_by_region.index,y=plastic_by_region.values,palette='viridis')
plt.title('total plastic weight by ocean region')
plt.xlabel('ocean region')
plt.ylabel('total plastic weight')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()