import Video from '../models/Video.js';
import mongoose from 'mongoose';

// 1️⃣ Upload a new video (with video link and thumbnail)
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, channel, views, likes, dislikes } = req.body;

    if (!videoUrl || !thumbnailUrl) {
      return res.status(400).json({ message: 'Video URL and Thumbnail URL are required' });
    }

    const newVideo = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      channel,
      views: views !== undefined ? views : 0,  // Use provided value or default to 0
      likes: likes !== undefined ? likes : 0,  // Use provided value or default to 0
      dislikes: dislikes !== undefined ? dislikes : 0
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2️⃣ Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('channel', 'name avatar'); // Populate channel name
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3️⃣ Get video by ID
export const getVideoById = async (req, res) => {
  try {
    console.log('Full request received:', req.params);  // Log full request params

    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: `Invalid video ID format: ${videoId}` });
    }

    const video = await Video.findById(videoId).populate('channel', 'name avatar');

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error('Error fetching video:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// 4️⃣ Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: `Invalid video ID format: ${videoId}` });
    }

    // 1. Find the video and populate channel
    const video = await Video.findById(videoId).populate('channel');

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // 2. Check if logged-in user is the owner of the channel
    if (video.channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this video' });
    }

    // 3. Delete the video
    await Video.findByIdAndDelete(videoId);

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error.message);
    res.status(500).json({ error: error.message });
  }
};


// 5️⃣ Edit a video
export const editVideo = async (req, res) => {
  try {
    const videoId = req.params.id;;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: `Invalid video ID format: ${videoId}` });
    }

    const video = await Video.findById(videoId).populate({
      path: 'channel',
      select: 'owner name',
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    console.log('Logged-in User:', req.user?.id);
    console.log('Video Channel Owner:', video.channel?.owner?.toString());

    if (video.channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to edit this video' });
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error('Error editing video:', error.message);
    res.status(500).json({ error: error.message });
  }
};
