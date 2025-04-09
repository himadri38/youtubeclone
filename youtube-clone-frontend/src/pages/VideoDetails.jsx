import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentSection from "../components/CommentSection";

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchVideoAndChannel = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        const videoData = res.data;
        setVideo(videoData);

        const channelData = videoData.channel;
        if (channelData && typeof channelData === "object") {
          setChannel(channelData);
        } else if (channelData) {
          const channelRes = await axios.get(`http://localhost:5000/api/channels/${channelData}`);
          setChannel(channelRes.data);
        }
      } catch (err) {
        console.error("Error fetching video or channel:", err.message);
      }
    };

    fetchVideoAndChannel();
  }, [id]);

  if (!video || !channel) return <div className="p-4">Loading...</div>;

  const convertYouTubeUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="p-4 max-w-6xl mx-auto mt-16">
      {/* Video Player */}
      <div className="w-full aspect-video">
        <iframe
          src={convertYouTubeUrl(video.videoUrl)}
          title={video.title}
          className="w-full h-full rounded-xl shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Title & Metadata */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">{video.title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Like / Dislike Buttons */}
      <div className="flex items-center gap-4 mt-2">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
        >
          <span role="img" aria-label="like">👍</span>
          <span>{video.likes}</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
        >
          <span role="img" aria-label="dislike">👎</span>
          <span>{video.dislikes}</span>
        </button>
      </div>

      {/* Channel Info */}
      <div className="flex items-center justify-between mt-6 border-b pb-4">
        <div className="flex items-center gap-4">
          <img
            src={channel.avatar || "/default-avatar.png"}
            alt={channel.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{channel.name}</p>
            <p className="text-sm text-gray-500">
              {channel.subscribers?.length || 0} subscribers
            </p>
          </div>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-full hover:opacity-90">
          Subscribe
        </button>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-800 whitespace-pre-line">{video.description}</p>

      {/* Comments */}
      <CommentSection videoId={id} />
    </div>
  );
};

export default VideoDetails;
