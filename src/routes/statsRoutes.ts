import express from 'express';
import { getStatistics } from '../controllers/statsController';
const router = express.Router();


router.route('/').get(getStatistics);


export default router;