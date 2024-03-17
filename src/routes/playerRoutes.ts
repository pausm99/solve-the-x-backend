import express from 'express';
import playerController from '../controllers/playerController';
const router = express.Router();


router.route('/').get(playerController.getAllPlayers);
router.route('/').post(playerController.createPlayer);
router.route('/:id').put(playerController.updatePlayer);
router.route('/:id').delete(playerController.deletePlayer);


export default router;