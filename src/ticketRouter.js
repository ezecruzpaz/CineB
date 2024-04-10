import express from 'express';

import ticketController from "./ticketController.js";



const router = express.Router();

// Ruta para crear un nuevo ticket
router.post('/create', ticketController.createTicket);

// Ruta para obtener todos los tickets
router.get('/all', ticketController.getAllTickets);


export default router;
