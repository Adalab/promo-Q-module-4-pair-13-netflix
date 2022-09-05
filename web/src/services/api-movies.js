/*NOTA: estructura de un documento/servicio de fetch:
- cqs
- fetch
- variables auxiliares*/

//DOCUMENT.QUERYSELECTORS
const inputValue = document.querySelector(".form__input-text");

// login

const getMoviesFromApi = (params) => {
  console.log("Se están pidiendo las películas de la app");
  console.log(params);
  return fetch(`//localhost:4000/movies${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

/*NOTA: el objeto "params" viene de...*/

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
