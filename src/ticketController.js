import pool from "./db.js";

export const createTicket = (req, res) => {
    const { idsala, idhorario, numasiento, fechacompra, nombrecliente, folio, idpelicula, total, idusuario } = req.body;
    const INSERT_TICKET_QUERY = `INSERT INTO ticket (idsala, idhorario, numasiento, fechacompra, nombrecliente, folio, idpelicula, total, idusuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    pool.query(INSERT_TICKET_QUERY, [idsala, idhorario, numasiento, new Date(fechacompra), nombrecliente, folio, idpelicula, parseFloat(total), idusuario], (error, results) => {
        if (error) {
            console.error('Error al crear el ticket: ', error);
            res.status(500).json({ error: 'Error al crear el ticket' });
        } else {
            res.status(200).json({ message: 'Ticket creado correctamente', id: results.insertId });
        }
    });
};

export const getAllTickets = (req, res) => {
    const SELECT_ALL_TICKETS_QUERY = 'SELECT * FROM ticket';

    pool.query(SELECT_ALL_TICKETS_QUERY, (error, results) => {
        if (error) {
            console.error('Error al obtener los tickets: ', error);
            res.status(500).json({ error: 'Error al obtener los tickets' });
        } else {
            res.status(200).json(results);
        }
    });
};

export default { createTicket, getAllTickets };
