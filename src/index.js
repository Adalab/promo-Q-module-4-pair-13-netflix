const movies = require("./data/movies.json");
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
  resp.json({
    success: true,
    movies: resp.query.gender,
  });
  resp.json(response);
});
