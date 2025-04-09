import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import channelRoutes from './routes/channel.js';
import videoRoutes from './routes/video.js';
import commentRoutes from './routes/comment.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // your frontend's URL
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
