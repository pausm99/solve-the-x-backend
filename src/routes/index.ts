import express from 'express';
import playerRoutes from './playerRoutes';

const router = express.Router();


router.use('/players', playerRoutes);

export default router;
