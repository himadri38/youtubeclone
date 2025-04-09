// src/pages/Home.jsx

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "../api/api";
import VideoCard from "../components/VideoCard";
import FilterBar from "../components/Filterbar";

const Home = () => {
  const { searchTerm } = useOutletContext();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="px-4 py-4 sm:px-6 md:px-10 md:py-6 space-y-6">
  {/* Filter buttons at the top */}
  <FilterBar />

  {/* Video grid */}
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {filteredVideos.length > 0 ? (
      filteredVideos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">No videos found.</p>
    )}
  </div>
</div>

  );
};

export default Home;
