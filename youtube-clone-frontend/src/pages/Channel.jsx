import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/api";
import VideoCard from "../components/VideoCard";

const Channel = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/channels/${id}`);
        console.log("Channel response:", res.data);
        const fetchedChannel = res.data.channel || res.data; // adjust based on your API response
        setChannel(fetchedChannel);
      } catch (err) {
        console.error("Failed to fetch channel:", err);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await axios.get("/videos");
        const filtered = res.data.filter((video) => {
          const channelId = typeof video.channel === "object" ? video.channel._id : video.channel;
          return channelId?.toString() === id;
        });
        setVideos(filtered);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchChannel();
    fetchVideos();
  }, [id]);

  if (!channel) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      {/* Channel Info */}
      <div className="mb-6 bg-white shadow rounded-lg p-6 flex items-center gap-6">
        <img
          src={channel.profileImageUrl || "/default-profile.png"}
          alt="Channel"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{channel.name}</h2>
          <p className="text-gray-600">{channel.description}</p>
          <p className="text-gray-500 mt-1">{channel.subscribers} subscribers</p>
        </div>
      </div>

      {/* Videos List */}
      <h3 className="text-xl font-semibold mb-4">Videos by {channel.name}</h3>
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No videos in this channel yet.</p>
      )}
    </div>
  );
};

export default Channel;
