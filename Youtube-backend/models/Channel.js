import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String },
  profileImageUrl: { type: String, default: "" },
  subscribers: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Channel', ChannelSchema);
