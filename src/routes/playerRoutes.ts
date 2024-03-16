import express from 'express';
const router = express.Router();


router.route('/').get();
router.route('/').post();
router.route('/').put();
router.route('/').delete();


export default router;