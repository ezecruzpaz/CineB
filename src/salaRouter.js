import express from "express";
import { listarSalas } from "./salaController.js";

const salasRouter = express.Router();

// Ruta para listar todas las salas
salasRouter.get("/lista-salas", async (req, res) => {
  try {
    const salas = await listarSalas();
    res.render("pages/salasadmin", { salas });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

export default salasRouter;
