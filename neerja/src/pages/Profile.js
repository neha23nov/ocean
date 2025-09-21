import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(user?.avatar || "");

  if (!user) return <p className="text-white">You are not logged in.</p>;

  // Handle avatar change (for now, store locally)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        setUser({ ...user, avatar: reader.result });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, avatar: reader.result })
        );
      };
      reader.readAsDataURL(file); // Convert to base64 string
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#0D1117] text-white">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <div className="flex items-center space-x-6 mb-6">
        <div>
          <img
            src={avatar || "/default-avatar.png"}
            alt={user.name}
            className="w-24 h-24 rounded-full mb-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="text-sm text-gray-400"
          />
        </div>
        <div>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
