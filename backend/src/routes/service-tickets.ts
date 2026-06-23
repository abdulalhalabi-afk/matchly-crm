import express from 'express';
import * as ticketController from '../controllers/serviceTicketController';

const router = express.Router();

router.get('/', ticketController.getAllTickets);
router.post('/', ticketController.createTicket);
router.get('/:id', ticketController.getTicketById);
router.put('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);

export default router;
