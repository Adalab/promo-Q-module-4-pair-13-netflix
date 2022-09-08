const moviesList = require("./data/movies.json");
const express = require("express");
const cors = require("cors");
const dataBase = require("better-sqlite3");


// create and config server
const server = express();
server.use(cors());
server.use(express.json());
const db = new dataBase("./src/movies.db", { verbose: console.log });

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

//Código para crear un servidor de estáticos
const staticServerPathWeb = "./src/public-react"; //Carp con ficheros estáticos
server.use(express.static(staticServerPathWeb));
