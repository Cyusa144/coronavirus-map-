import Router from 'express';
import { postCountry, getCountry } from '../controllers/countryController';

const router = Router();

router.get('/', getCountry);
router.post('/', postCountry);


export default router;