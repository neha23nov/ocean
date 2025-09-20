import React, { useState } from "react";
import { sendContact } from "../services/api"; // ✅ make sure this points to /api/contact

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContact(formData); // call backend
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // clear form
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to send message. Try again.");
    }
  };

  return (
    <div className="full min-h-screen bg-[#161B22] text-white grid grid-cols-1 md:grid-cols-2">
      {/* Left: Contact Form */}
      <div className="p-16 flex flex-col justify-center">
        <h2 className="text-5xl font-extrabold mb-6">Contact Us</h2>
        <p className="mb-8 text-xl text-gray-300">
          We’re here to help! Fill out the form below and we’ll get back to you.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-lg font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#0D1117] border border-gray-700 text-lg"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#0D1117] border border-gray-700 text-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium">Your Message</label>
            <textarea
              rows="6"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#0D1117] border border-gray-700 text-lg"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold text-lg"
          >
            Send Message
          </button>
        </form>

        {status && <p className="mt-4 text-lg">{status}</p>}
      </div>

      {/* Right: FAQ + Resources */}
      <div className="p-16 flex flex-col justify-start bg-[#0D1117]">
        <h3 className="text-4xl font-bold mb-6">Frequently Asked Questions</h3>
        <details className="mb-6">
          <summary className="cursor-pointer text-xl font-semibold">
            How do I access the data?
          </summary>
          <p className="mt-2 text-gray-300 text-lg">
            You can access the data by signing up and navigating to the portal.
          </p>
        </details>
        <details className="mb-6">
          <summary className="cursor-pointer text-xl font-semibold">
            What tools are available?
          </summary>
          <p className="mt-2 text-gray-300 text-lg">
            We provide APIs, SDKs, and visualization dashboards.
          </p>
        </details>
        <details>
          <summary className="cursor-pointer text-xl font-semibold">
            How can I contribute?
          </summary>
          <p className="mt-2 text-gray-300 text-lg">
            You can contribute by sharing insights, reporting issues, or submitting pull requests.
          </p>
        </details>

        <h3 className="text-4xl font-bold mt-10 mb-6">Resources & Support</h3>
        <ul className="space-y-4 text-xl">
          <li>
            <a href="#" className="hover:text-blue-400">📘 Documentation →</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">📑 User Guides →</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">🎧 Direct Support →</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">💬 Feedback →</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
