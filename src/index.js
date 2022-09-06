const moviesList = require("./data/movies.json");
const express = require("express");
const cors = require("cors");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

/*NOTA: req.query y req.body son métodos de Express, 
hay más información sobre ellos en la documentación;
básicamente son para marcar los queryParams y los bodyParams
de una petición (request)*/

//4.2 Pedir todas las películas
server.get("/movies", (req, resp) => {
  console.log(req.query);
  const selectedMovies = req.query.gender ? req.query.gender : "all";
  const filteredMovies = moviesList.filter(
    (oneMovie) => selectedMovies === "all" || oneMovie.gender === selectedMovies
  );
  const responseForUser = {
    success: true,
    movies: filteredMovies,
  };
  resp.json(responseForUser);
});

server.post("/login", (req, resp) => {
  if (req.body.email === '' || req.body.password === '') {
    const restError = {
      success: false,
      message: 'faltan campos por rellenar'
    }
    resp.json(restError);
  } else {
    const respTrue = {
      success: true,
    }
    resp.json(respTrue);
  }
});


const staticServerPathWeb = "./src/public-react";
server.use(express.static(staticServerPathWeb));
