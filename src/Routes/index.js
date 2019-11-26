import { Router } from 'express';
import Validation from '../Validation';
import FlightController from '../Controllers';

const router = Router();

router.post('/search-flight', Validation.validate, FlightController.search);
export default router;
