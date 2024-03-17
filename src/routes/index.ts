import express from 'express';
import playerRoutes from './playerRoutes';
import userRoutes from './userRoutes';

const router = express.Router();


router.use('/players', playerRoutes);
router.use('/users', userRoutes);

export default router;
