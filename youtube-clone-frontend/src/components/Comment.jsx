import { useEffect, useState } from "react";
import axios from "../api/api";

const Comment = ({ comment, currentUserId, onDelete }) => {
  const [username, setUsername] = useState("Loading...");
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userId = typeof comment.userId === "object" ? comment.userId._id : comment.userId;
        const res = await axios.get(`/users/${userId}`);
        setUsername(res.data.username);
      } catch (err) {
        console.error("Error fetching username:", err);
        setUsername("Unknown User");
      }
    };

    if (comment.userId) fetchUsername();
  }, [comment.userId]);

  const token = localStorage.getItem("token");

  const isOwner =
    String(currentUserId) ===
    String(typeof comment.userId === "object" ? comment.userId._id : comment.userId);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `/comments/${comment._id}`,
        { text: editedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      comment.text = res.data.text;
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/comments/${comment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(comment._id);
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm relative w-full max-w-2xl mx-auto">
      <p className="text-sm font-semibold break-words">{username}</p>

      {isEditing ? (
        <>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full border border-gray-300 p-2 mt-2 rounded-md resize-none"
            rows={3}
          />
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-700 mt-2 break-words">{comment.text}</p>
      )}

      <p className="text-xs text-gray-400 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>

      {isOwner && !isEditing && (
        <div className="absolute top-2 right-2 flex flex-col sm:flex-row gap-2 text-sm">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
