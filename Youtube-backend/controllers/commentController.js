import Comment from '../models/Comment.js';

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    const comment = new Comment({
      text,
      userId: req.user.id, // 👈 From token
      videoId
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Comments for a Video
export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).populate('userId', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // 👇 Ensure only the comment owner can delete
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this comment' });
    }

    await comment.deleteOne();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to update" });

    comment.text = req.body.text || comment.text;
    await comment.save();

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

