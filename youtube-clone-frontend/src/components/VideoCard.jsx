import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition">
      <Link to={`/video/${video._id}`}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-base line-clamp-2">{video.title}</h3>

        <div className="flex items-center gap-2 mt-2">
          <img
            src={video.channel?.avatar || "/default-avatar.png"}
            alt={video.channel?.name || "Channel"}
            className="w-8 h-8 rounded-full"
          />
          <Link
            to={`/channel/${video.channel?._id}`}
            className="text-sm text-gray-600 hover:underline"
          >
            {video.channel?.name || "Unnamed Channel"}
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-1">{video.views} views</p>
      </div>
    </div>
  );
};

export default VideoCard;
