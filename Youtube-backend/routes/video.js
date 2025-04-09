import express from 'express';
import { uploadVideo, getAllVideos, getVideoById, deleteVideo, editVideo } from '../controllers/videoController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', uploadVideo);
router.get('/', getAllVideos);
router.get('/:videoId', getVideoById);
router.delete('/:videoId', verifyToken, deleteVideo);
router.put('/:id', verifyToken, editVideo);

export default router;
