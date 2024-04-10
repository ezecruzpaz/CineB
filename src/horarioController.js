import pool from "./db.js";

// Obtener todos los horarios
export const listarHorarios = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM horario");
    return rows;
  } catch (error) {
    throw { status: 500, message: "Error al obtener los horarios" };
  }
};
