// src/components/Sidebar.jsx
import { Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/api";

const Sidebar = ({ isOpen }) => {
  const [channelId, setChannelId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const res = await axios.get(`/channels/user/${user._id}`);
        setChannelId(res.data._id); // ✅ store channel _id
      } catch (err) {
        console.error("Error fetching channel:", err);
      }
    };

    fetchChannel();
  }, []);

  const handleYourChannelClick = () => {
    if (channelId) {
      navigate(`/channel/${channelId}`);
    } else {
      alert("Channel not found.");
    }
  };

  return (
    <aside
      className={`bg-white shadow-md w-64 p-4 fixed top-16 bottom-0 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 z-40`}
    >
      <nav className="flex flex-col gap-4">
        <Link to="/" className="block px-4 py-2 rounded-md bg-gray-200 text-gray-800 font-medium text-center hover:bg-gray-300 transition">
          <Home size={20} className="inline mr-2" />
          Home
        </Link>

        <Link
          to="/create-channel"
          className="block px-4 py-2 rounded-md bg-gray-200 text-gray-800 font-medium text-center hover:bg-gray-300 transition"
        >
          Create Channel
        </Link>

        <button
          onClick={handleYourChannelClick}
          className="block px-4 py-2 rounded-md bg-gray-200 text-gray-800 font-medium text-center hover:bg-gray-300 transition"
        >
          Your Channel
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
