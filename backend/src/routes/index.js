import dotenv from 'dotenv';
import { Router } from 'express';
import userRoutes from './userRoute';
import newsRoutes from './newsRoute';
import commentRoutes from './commentRoute';
import todayRoutes from './todayRoute';
import countryRoutes from './countryRoute';

const router = Router();

router.use('/users', userRoutes);
router.use('/news', newsRoutes);
router.use('/comments', commentRoutes);
router.use('/todayTest', todayRoutes);
router.use('/country', countryRoutes);

export default router;
