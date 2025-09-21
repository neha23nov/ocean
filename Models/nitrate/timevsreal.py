import matplotlib.pyplot as plt
from model import df

plt.figure(figsize=(12,6))
plt.plot(df['time'], df['nitrate_concentration'], label='Real', alpha=0.7)
plt.plot(df['time'], df['predicted_nitrate'], label='Predicted', alpha=0.7)
plt.legend()
plt.xlabel("Time")
plt.ylabel("Nitrate Concentration")
plt.title("Real vs Predicted Nitrate Concentration")
plt.show()
