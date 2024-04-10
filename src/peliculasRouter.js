import express from "express";
import {
  agregarPelicula,
  listarPeliculas,
  eliminarPelicula,
  actualizarPelicula,
  obtenerDetallesPelicula,
  visualizarPeliculas
} from "./peliculaController.js";

const peliculasRouter = express.Router();

// Ruta para obtener la lista de películas
peliculasRouter.get("/lista-Peliculas", async (req, res) => {
  try {
    const peliculas = await listarPeliculas();
    // Renderiza una página con la lista de películas
    res.render("pages/For_usuarios2", { peliculas });
  } catch (error) {
    // Maneja los errores y envía una respuesta JSON en caso de error
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para visualizar todas las películas
peliculasRouter.get("/visualizar-peliculas", async (req, res) => {
  try {
    const peliculas = await visualizarPeliculas();
    // Renderiza una página con la visualización de películas
    res.render("pages/visualizar_peliculas", { peliculas });
  } catch (error) {
    // Maneja los errores y envía una respuesta JSON en caso de error
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para agregar una nueva película
peliculasRouter.post("/peliculas", async (req, res) => {
  const { nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio } = req.body;

  try {
    // Llama a la función para agregar una nueva película
    await agregarPelicula({ nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio });
    // Redirecciona a la lista de películas después de agregar una nueva película
    res.redirect("/lista-Peliculas");
  } catch (error) {
    // Maneja los errores y envía una respuesta JSON en caso de error
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para obtener el formulario de actualización de una película por su ID
peliculasRouter.get("/formulario-actualizar-pelicula/:id", async (req, res) => {
  const peliculaId = req.params.id;

  try {
    // Obtiene los detalles de la película por su ID y renderiza el formulario de actualización
    const pelicula = await obtenerDetallesPelicula(peliculaId);
    res.render("pages/update_peliculas", { pelicula });
  } catch (error) {
    // Maneja los errores y envía una respuesta JSON en caso de error
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para actualizar una película por su ID
peliculasRouter.post("/actualizar-pelicula/:id", async (req, res) => {
  const id = req.params.id;
  const { nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio } = req.body;

  console.log(req.body); // Agrega esta línea para verificar los datos recibidos

  try {
    // Llama a la función para actualizar una película por su ID
    await actualizarPelicula(id, { nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio });
    // Redirecciona a la lista de películas después de actualizar una película
    res.redirect("/lista-Peliculas");
  } catch (error) {
    // Maneja los errores y envía una respuesta JSON en caso de error
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para eliminar una película por su ID
peliculasRouter.post("/borrar-pelicula/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Llama a la función para eliminar una película por su ID
    await eliminarPelicula(id);
    // Redirecciona a la lista de películas después de eliminar una película
    res.redirect("/lista-Peliculas");
  } catch (error) {
    // Maneja los errores y envía una respuesta JSON en caso de error
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});


export default peliculasRouter;
