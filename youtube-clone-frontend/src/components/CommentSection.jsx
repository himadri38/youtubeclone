// src/components/CommentSection.jsx
import { useEffect, useState } from "react";
import axios from "../api/api";
import Comment from "./Comment";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchComments();
  }, [videoId]);

  const handlePost = async () => {
    if (!token || !newComment.trim()) return;

    try {
      const res = await axios.post(
        `/comments`, // ✅ correct endpoint
        { text: newComment, videoId }, // ✅ send videoId in body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const handleDelete = (commentId) => {
    setComments((prev) => prev.filter((c) => c._id !== commentId));
  };

  return (
    <div className="mt-8 px-4 sm:px-6 md:px-0">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-6">
        <input
          type="text"
          placeholder={user ? "Write a comment..." : "Login to comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handlePost}
          disabled={!user || !newComment.trim()}
          className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            currentUserId={user?._id}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
