import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log("Signup success:", res.data);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0D1117] text-white px-4">
      <div className="w-full max-w-md bg-[#161B22] rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Create your account</h2>
        <p className="text-center text-gray-400 mb-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">Log in</a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-300">Username</label>
            <input
              type="text"
              name="name"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-md bg-[#0D1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md bg-[#0D1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-[#0D1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-[#0D1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-start space-x-2 text-sm text-gray-400">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mt-1 accent-blue-500"
              required
            />
            <span>
              I agree to the{" "}
              <a href="/terms" className="text-blue-400 hover:underline">Terms</a> and{" "}
              <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
