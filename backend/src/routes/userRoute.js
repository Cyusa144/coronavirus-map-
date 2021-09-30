import { Router } from 'express';
import { signIn, signUp } from '../controllers/userController';

const router = Router();

router.post('/signup', signUp);
router.post('/login', signIn);

export default router;
