import express from 'express';
import { createChannel, getAllChannels, deleteChannel, getChannelById, getChannelByUserId } from '../controllers/channelController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createChannel);
router.get('/', getAllChannels);
router.delete('/:id', verifyToken, deleteChannel);
router.get("/:id", getChannelById);
router.get('/user/:userId', getChannelByUserId);

export default router;
