import express from "express";
import {
  agregarUsuario,
  listarUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  obtenerDetallesUsuario,
  obtenerDetallesUsuarioUpdate,
  autenticarUsuario ,obtenerDetallesPelicula
} from "./usuarioController.js";

const router = express.Router();


// Ruta para procesar el formulario de inicio de sesión


router.get("/Crud-Completo-con-NodeJS-Express-y-MySQL", async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    res.render("pages/home", { usuarios });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

router.get("/Crud-taquillero", async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    res.render("pages/hometaquillero", { usuarios });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

router.get("/Crud-usuarios", async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    res.render("pages/Lis_Usuarios", { usuarios });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Registrar un nuevo usuario
router.post("/usuarios", async (req, res) => {
  const { nombre_usuario, contrasena_encriptada, tipo_usuario, estado } = req.body;

  try {
    await agregarUsuario({ nombre_usuario, contrasena_encriptada, tipo_usuario, estado });
    res.redirect("/");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});



// Detalles del usuario
router.get("/detalles/:id", async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await obtenerDetallesUsuario(usuarioId);
    res.render("pages/detalles_usuario", { usuario });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Mostrar formulario para actualizar un usuario
router.get("/formulario-actualizar-usuario/:id", async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await obtenerDetallesUsuarioUpdate(usuarioId);

    res.render("pages/update_usuario", { usuario });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para actualizar un usuario por ID
router.post("/actualizar-usuario/:id", async (req, res) => {
  const { nombre_usuario, contrasena_encriptada, tipo_usuario, estado } = req.body;
  const id = req.params.id;

  try {
    await actualizarUsuario(id, {
      nombre_usuario,
      contrasena_encriptada,
      tipo_usuario,
      estado,
    });

    res.redirect("/Crud-Completo-con-NodeJS-Express-y-MySQL");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para borrar un usuario por ID
router.post("/borrar-usuario/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await eliminarUsuario(id);
    res.redirect("/Crud-Completo-con-NodeJS-Express-y-MySQL");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

router.get('/inicio-login', (req, res) => {
  // Aquí renderiza la vista de la lista de usuarios o realiza cualquier otra acción necesaria
  res.render('inicio', {});
});

// Maneja la ruta para la lista de usuarios
router.get('/lista-usuarios', (req, res) => {
  // Aquí renderiza la vista de la lista de usuarios o realiza cualquier otra acción necesaria
  res.render('pages/hometaquillero', {});
});
router.get ("/salas-admin",async (req, res) => {
  // Aquí renderiza la vista de la lista de usuarios o realiza cualquier otra acción necesaria
  try {
    const salas = await listarSalasta();
    res.render("pages/For_Usuarios", { salas });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Utiliza la función listarSalas aquí







router.get('/lista-Peliculas', async (req, res) => {
  try {
    const peliculas = await listarPeliculas();
    res.render('pages/For_usuarios2', { peliculas });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para agregar una nueva película
router.post('/peliculasnueva', async (req, res) => {
  const { nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio } = req.body;

  try {
    await agregarPelicula({ nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio });
    res.redirect('/lista-Peliculas'); // Redirige a la página de lista de películas después de agregar una nueva película
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});





router.get("/Crud-Completo-con-NodeJS-Express-y-MySQL", async (req, res) => {
  try {
    const { Tipo, estadoUsuario, busquedaUsuario } = req.query;
    const usuarios = await obtenerUsuariosFiltrados({ tipo: Tipo, estado: estadoUsuario, busqueda: busquedaUsuario });
    res.render("pages/lis_usuarios", { usuarios });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});


// Ruta para procesar el formulario de inicio de sesión
router.post("/inicio", async (req, res) => {
  try {
    // Llama a la función de autenticación
    await autenticarUsuario(req, res);
  } catch (error) {
    // Captura errores y renderiza la página de inicio de sesión con un mensaje de error
    const errorMessage = error.message || 'Error al procesar la solicitud';
    res.render('pages/login', { message: errorMessage });
  }
});
router.post("/inicio", async (req, res) => {
  try {
    const { usuario, tipoUsuario } = await autenticarUsuario(req, res);

    // Guarda el tipo de usuario en la sesión
    req.session.tipoUsuario = tipoUsuario;

    // Redirige al usuario según su tipo
    if (tipoUsuario === 'super admin') {
      res.redirect('/pages/Lis_usuarios');
    } else if (tipoUsuario === 'taquillero') {
      res.redirect('/pages/For_usuarios');
    } else {
      res.render('inicio', { message: 'Tipo de usuario no válido' });
    }
  } catch (error) {
    const errorMessage = error.message || 'Error al procesar la solicitud';
    res.render('inicio', { message: errorMessage });
  }
});


//Peliculas


import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path'; 
import fs from 'fs'; 
import { agregarPelicula, listarPeliculas } from "./peliculaController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define la ruta del directorio de destino para subir los archivos
const uploadDirectory = path.join(__dirname, '..', 'views', 'uploads', 'peliculas');

// Verifica si el directorio de destino existe, si no, créalo
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Define la configuración para multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // Guarda los archivos en el directorio de destino
  },
  filename: function (req, file, cb) {
    // Utiliza 'path' para manipular la extensión del archivo
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Inicializa multer con la configuración
const upload = multer({ storage: storage });


// Ruta para agregar una nueva película
router.post("/peliculas", upload.single('imagen'), async (req, res) => {
  const { nombre_pelicula, sinopsis, duracion, genero, estado, precio } = req.body;
  const imagen = req.file.filename; 

  try {
    await agregarPelicula({ nombre_pelicula, sinopsis, duracion, genero, estado, imagen, precio });
    res.redirect("/lista-Peliculas");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

router.get("/formulario-actualizar-pelicula/:id", async (req, res) => {
  const peliculaId = req.params.id;

  try {
    const pelicula = await obtenerDetallesPelicula(peliculaId);
    res.render("pages/update_pelicula", { pelicula });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});




//Salas

// Importa la función para listar las salas
import { listarSalas,listarHorarios } from "./usuarioController.js";



// Ruta para listar todas las salas

router.get("/salas", async (req, res) => {
  try {
    const salas = await listarSalas();
    const primeraSala = salas[0]; // Puedes cambiar esto según tu lógica

    // Obtener los horarios de inicio de la primera sala por defecto
    const horarios = await listarHorarios(primeraSala.nombresala);


    // Obtener la lista de películas para el dropdownlist
    const peliculas = await listarPeliculas();

    res.render("pages/salasadmin", { salas, horarios, peliculas }); // Pasa las salas, horarios y películas a la vista
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

router.get("/salas/:nombresala", async (req, res) => {
  const nombresala = req.params.nombresala;
  try {
    const horarios = await listarHorarios(nombresala); // Obtener los horarios de inicio de la sala seleccionada

    // Obtener la lista de salas para el dropdownlist
    const salas = await listarSalas();

    // Obtener la lista de películas para el dropdownlist
    const peliculas = await listarPeliculas();

    res.render("pages/salasadmin", { salas, horarios, peliculas }); // Pasa las salas, horarios y películas a la vista
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

router.get('/lista-salas', async(req, res) => {
  // Aquí renderiza la vista de la lista de usuarios o realiza cualquier otra acción necesaria
  try {
    const salas = await listarSalas();
    const primeraSala = salas[0]; // Puedes cambiar esto según tu lógica

    // Obtener los horarios de inicio de la primera sala por defecto
    const horarios = await listarHorarios(primeraSala.nombresala);


    // Obtener la lista de películas para el dropdownlist
    const peliculas = await listarPeliculas();

    res.render('pages/For_Usuarios',  { salas, horarios, peliculas }); // Pasa las salas, horarios y películas a la vista
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

router.get("/lista-salas/:nombresala", async (req, res) => {
  const nombresala = req.params.nombresala;
  try {
    const horarios = await listarHorarios(nombresala); // Obtener los horarios de inicio de la sala seleccionada

    // Obtener la lista de salas para el dropdownlist
    const salas = await listarSalas();

    // Obtener la lista de películas para el dropdownlist
    const peliculas = await listarPeliculas();

    res.render('pages/For_Usuarios',  { salas, horarios, peliculas }); // Pasa las salas, horarios y películas a la vista
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});



// Ruta para obtener los ticket  
import ticketRouter from "./ticketRouter.js"; // Importa el enrutador de tickets

router.use("/tickets", ticketRouter);

export default router;
