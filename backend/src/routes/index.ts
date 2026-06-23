import express from 'express';
import contacts from './contacts';
import organizations from './organizations';
import tickets from './tickets';
import appointments from './appointments';
import notes from './notes';

const router = express.Router();

router.use('/contacts', contacts);
router.use('/organizations', organizations);
router.use('/tickets', tickets);
router.use('/appointments', appointments);
router.use('/notes', notes);

export default router;
