//datos
const moviesList = require("./data/movies.json");

//extensiones, librerías, etc.
const express = require("express");
const cors = require("cors");
const dataBase = require("better-sqlite3");
const ejs = require("ejs");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

//databases
const db = new dataBase("./src/movies.db", { verbose: console.log });
server.set("view engine", "ejs");

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
/* "todas"a veces viene vacío y a veces con "all" */
server.get("/movies", (req, resp) => {
  // const query = db.prepare(`SELECT * FROM movies WHERE LOWER(gender)='comedia'`);
  let userMovie = [];
  if (req.query.gender === "all" || req.query.gender === "") {
    const query = db.prepare(`SELECT * FROM movies ORDER BY name DESC`);
    userMovie = query.all();
  } else {
    const query = db.prepare(
      `SELECT * FROM movies WHERE gender = ? ORDER BY name DESC`
    );
    userMovie = query.all(req.query.gender);
  }

  // const filteredMovies = moviesList.filter(
  //   (oneMovie) => selectedMovies === "all" || oneMovie.gender === selectedMovies
  // );
  const responseForUser = {
    success: true,
    movies: userMovie,
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

//endpoint para sign-up
server.post("/signup", (req, resp) => {
  if (req.body.email === "" || req.body.password === "") {
    const restError = {
      success: false,
      message: "faltan campos por rellenar",
    };
    resp.json(restError);
  } else {
    //insert
    const query = db.prepare(
      `INSERT INTO users (email, password) VALUES (?, ?)`
    );
    const results = query.run(`${req.body.email}`, `${req.body.password}`);
    console.log(results);
    const respTrue = {
      success: true,
      data: results,
    };
    resp.json(respTrue);
  }
});

//Código para crear un servidor de estáticos

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
server.use(express.static(staticServerPathWeb));
