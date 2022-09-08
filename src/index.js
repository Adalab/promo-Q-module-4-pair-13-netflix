//datos
const moviesList = require("./data/movies.json");

//extensiones, librerías, etc.
const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
const dataBase = require("better-sqlite3");

=======
const ejs = require("ejs");
>>>>>>> 51c429e6b39080fed6045956c4960484982d91fe

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
<<<<<<< HEAD
const db = new dataBase("./src/movies.db", { verbose: console.log });
=======
server.set("view engine", "ejs");
>>>>>>> 51c429e6b39080fed6045956c4960484982d91fe

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

/*NOTA: req.query y req.body son métodos de Express, 
hay más información sobre ellos en la documentación;
básicamente son para marcar los queryParams y los bodyParams
de una petición (request). Mirar la tabla-resumen para terminar de entenderlo*/

//4.2 Pedir todas las películas
server.get("/movies", (req, resp) => {

  const query = db.prepare(`SELECT * FROM movies`);
  const queryAllMovies = query.all();
  // console.log(req.query);
  // const selectedMovies = req.query.gender ? req.query.gender : "all";
  // const filteredMovies = moviesList.filter(
  //   (oneMovie) => selectedMovies === "all" || oneMovie.gender === selectedMovies
  // );
  const responseForUser = {
    success: true,
    movies: queryAllMovies,
  };

  resp.json(responseForUser);

});


server.post("/login", (req, resp) => {
  if (req.body.email === "" || req.body.password === "") {
    const restError = {
      success: false,
      message: "faltan campos por rellenar",
    };
    resp.json(restError);
  } else {
    const respTrue = {
      success: true,
    };
    resp.json(respTrue);
  }
});

<<<<<<< HEAD
//Código para crear un servidor de estáticos
const staticServerPathWeb = "./src/public-react"; //Carp con ficheros estáticos
=======
//Motor de plantillas
//NOTA SOBRE LAS RUTAS: en los imports, se escriben desde el index.js y en el resto, desde la raíz
server.get("/movie/:movieId", (req, resp) => {
  console.log(req.params.movieId);
  const foundedMovie = moviesList.find(
    (movie) => movie.id === req.params.movieId
  );
  console.log(foundedMovie);
  resp.render("movieDetail", foundedMovie);
});

//Servidor de estáticos (siempre al final, para que renderice primero lo dinámico)
const staticServerPathWeb = "./src/public-react";
>>>>>>> 51c429e6b39080fed6045956c4960484982d91fe
server.use(express.static(staticServerPathWeb));
