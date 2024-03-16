import express from 'express';
import playerController from '../controllers/playerController';
const router = express.Router();


router.route('/').get(playerController.getAllPlayers);
router.route('/').post(playerController.createPlayer);
router.route('/').put();
router.route('/').delete();


export default router;