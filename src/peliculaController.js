import pool from "./db.js";

// Función para agregar una nueva película
export const agregarPelicula = async ({ nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio }) => {
  try {
    // Ejecuta la consulta SQL para insertar una nueva película en la base de datos
    await pool.query(
      "INSERT INTO Peliculas (nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio]
    );
  } catch (error) {
    // Captura y maneja cualquier error ocurrido durante la inserción de la película
    throw { status: 500, message: "Error al agregar la película" };
  }
};

// Función para obtener todas las películas
export const listarPeliculas = async () => {
  try {
    // Ejecuta la consulta SQL para obtener todas las películas de la base de datos
    const [rows] = await pool.query("SELECT * FROM Peliculas");
    return rows; // Retorna las películas obtenidas
  } catch (error) {
    // Captura y maneja cualquier error ocurrido durante la obtención de películas
    throw { status: 500, message: "Error al obtener películas" };
  }
};

// Función para visualizar todas las películas (mismo que listarPeliculas, no parece necesario)
export const visualizarPeliculas = async () => {
  try {
    // Ejecuta la consulta SQL para obtener todas las películas de la base de datos
    const [rows] = await pool.query("SELECT * FROM Peliculas");
    return rows; // Retorna las películas obtenidas
  } catch (error) {
    // Captura y maneja cualquier error ocurrido durante la obtención de películas
    throw { status: 500, message: "Error al visualizar películas" };
  }
};

// Función para actualizar una película existente por su ID
export const actualizarPelicula = async (id, { nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio }) => {
  try {
    // Ejecuta la consulta SQL para actualizar los datos de una película en la base de datos
    await pool.query(
      "UPDATE Peliculas SET nombre_pelicula = ?, sinopsis = ?, duracion = ?, genero = ?, estado = ?, imagen = ?, precio = ? WHERE id_pelicula = ?",
      [nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio, id]
    );
  } catch (error) {
    // Captura y maneja cualquier error ocurrido durante la actualización de la película
    throw {
      status: 500,
      message: `Error al actualizar la película con ID ${id}: ${error.message}`,
    };
  }
};

// Función para obtener los detalles de una película por su ID
export const obtenerDetallesPelicula = async (id) => {
  try {
    // Ejecuta la consulta SQL para obtener los detalles de una película por su ID
    const [rows] = await pool.query(
      "SELECT * FROM Peliculas WHERE id_pelicula = ?",
      [id]
    );

    if (rows.length === 1) {
      // Si se encuentra la película, retorna sus detalles
      const pelicula = rows[0];
      return pelicula;
    } else {
      // Si no se encuentra la película, lanza un error
      throw { status: 404, message: "Película no encontrada" };
    }
  } catch (error) {
    // Captura y maneja cualquier error ocurrido durante la obtención de detalles de la película
    console.error(error);
    throw { status: 500, message: "Error al obtener detalles de la película" };
  }
};

// Función para eliminar una película por su ID
export const eliminarPelicula = async (id) => {
  try {
    // Ejecuta la consulta SQL para eliminar una película por su ID
    await pool.query("DELETE FROM Peliculas WHERE id_pelicula = ?", [id]);
  } catch (error) {
    // Captura y maneja cualquier error ocurrido durante la eliminación de la película
    throw {
      status: 500,
      message: `Error al eliminar la película con ID ${id}`,
    };
  }
};
