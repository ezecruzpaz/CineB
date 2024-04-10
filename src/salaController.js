// salaController.js

import pool from "./db.js";

// Obtener todas las salas
export const listarSalas = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM sala");
    return rows;
  } catch (error) {
    console.error("Error al obtener las salas:", error);
    throw { status: 500, message: "Error interno del servidor al obtener las salas" };
  }
};

// Obtener todos los horarios de inicio de una sala específica
export const listarHorarios = async (nombresala) => {
  try {
      const [rows] = await pool.query("SELECT idhorario, horarioinicio FROM horario WHERE idsala IN (SELECT idsala FROM sala WHERE nombresala = ?)", [nombresala]);
      return rows;
  } catch (error) {
      console.error("Error al obtener los horarios de inicio:", error);
      throw { status: 500, message: "Error interno del servidor al obtener los horarios de inicio" };
  }
};


// Exporta la función para que esté disponible en otros archivos

