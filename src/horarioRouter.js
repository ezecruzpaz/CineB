import express from "express";
import {listarHorarios} from "./horarioController.js";

const router = express.Router();

// Ruta para obtener todos los horarios
router.get("/horarios", async (req, res) => {
  try {
    const horarios = await listarHorarios();
    res.render("pages/salasadmin", { horarios });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

export default router;
