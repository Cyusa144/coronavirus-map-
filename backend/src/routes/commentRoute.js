import { Router } from 'express';
import passport from 'passport';

import {
  getAllCommentsToNews,
  postCommentToNews,
} from '../controllers/commentController';

const router = Router();

router.get('/news/:newsId', getAllCommentsToNews);
router.post(
  '/news/:newsId',
  passport.authenticate('jwt', { session: false }),
  postCommentToNews
);

export default router;
