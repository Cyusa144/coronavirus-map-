import { Router } from 'express';
import passport from 'passport';
import {
  addNews,
  deleteNews,
  getAllNews,
  getNews,
  toggleFavorite,
  updateNews,
} from '../controllers/newsController';
import upload from '../util/multer';

const router = Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  addNews
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteNews
);
router.patch(
  '/favorites/:id',
  passport.authenticate('jwt', { session: false }),
  toggleFavorite
);
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  updateNews
);
router.get('/', getAllNews);
router.get('/:id', getNews);

export default router;
