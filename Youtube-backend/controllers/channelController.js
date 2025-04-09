import Channel from '../models/Channel.js';

// ✅ Create a Channel (owner is set from logged-in user)
export const createChannel = async (req, res) => {
  try {
    const { name, description } = req.body;
    // const owner = req.user.id; // Get user ID from token

    const channel = new Channel({ name,
      description,
      owner: req.user.id,
      profileImageUrl: "https://static.vecteezy.com/system/resources/previews/034/210/208/non_2x/3d-cartoon-baby-genius-photo.jpg", // default empty string
      subscribers: 15378  });
    await channel.save();
    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Channels
export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate("owner", "username email"); // Optional: show owner info
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a Channel (only by the owner)
// controller/channelController.js
export const deleteChannel = async (req, res) => {
  try {
    const channelId = req.params.id;
    console.log('Channel ID:', channelId); // ✅ Log to debug

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    // Confirm user is owner
    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this channel' });
    }

    await channel.deleteOne();
    res.json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.error('Error deleting channel:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get a single channel by ID
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    res.status(200).json({ channel });
  } catch (error) {
    console.error("Error getting channel:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getChannelByUserId = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.params.userId });
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};