import { Router } from 'express';
import { postTodaysTest, getTodaysTestData } from '../controllers/todayController';

const router = Router();

router.post('/', postTodaysTest);
router.get('/:country', getTodaysTestData);

export default router;