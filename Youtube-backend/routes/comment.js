import express from 'express';
import { addComment, getCommentsByVideo, deleteComment, updateComment } from '../controllers/commentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', verifyToken, addComment);
router.get('/:videoId', getCommentsByVideo);
router.delete('/:id', verifyToken, deleteComment);
router.put('/:id', verifyToken, updateComment);

export default router;
