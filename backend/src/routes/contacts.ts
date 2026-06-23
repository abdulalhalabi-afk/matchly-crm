import express from 'express';
import * as contactController from '../controllers/contactController';

const router = express.Router();

router.get('/', contactController.getAllContacts);
router.post('/', contactController.createContact);
router.get('/:id', contactController.getContactById);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

export default router;
