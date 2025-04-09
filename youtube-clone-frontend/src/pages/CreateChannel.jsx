// src/pages/CreateChannel.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";

const CreateChannel = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Channel name is required");

    setLoading(true);
    try {
      const res = await axios.post("/channels", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Channel created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Channel creation failed:", err);
      alert("Error creating channel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Create Your Channel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Channel Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Channel Description (optional)"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          {loading ? "Creating..." : "Create Channel"}
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;
