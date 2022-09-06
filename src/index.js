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
//queryParams
const queryParams = `?gender=${filterGender.value}`;

//4.2 Pedir todas las películas
server.get("/movies", (req, resp) => {
  resp.json({
    success: true,
    movies: movies,
  });
  console.log(resp);

});

const staticServerPathWeb = './src/public-react';
server.use(express.static(staticServerPathWeb));
