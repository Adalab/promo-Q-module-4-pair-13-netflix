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

//4.2 Pedir todas las películas
server.get("/movies", (req, resp) => {
  resp.json({
    success: true,
    movies: [
      {
        id: "1",
        title: "Gambita de dama",
        gender: "Drama",
        image:
          "//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg",
      },
      {
        id: "2",
        title: "Friends",
        gender: "Comedia",
        image:
          "//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/friends.jpg",
      },
    ],
  });
  console.log(resp);

});

const staticServerPathWeb = './src/public-react';
server.use(express.static(staticServerPathWeb));
