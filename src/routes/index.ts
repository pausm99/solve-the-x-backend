import express from 'express';
import playerRoutes from './playerRoutes';
import userRoutes from './userRoutes';
import statsRoutes from './statsRoutes';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();


router.use('/players', authenticateToken, playerRoutes);
router.use('/users', userRoutes);
router.use('/statistics', authenticateToken, statsRoutes);

export default router;
