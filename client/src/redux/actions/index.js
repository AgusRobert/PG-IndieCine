import axios from "axios";
import {
    SEARCH_PELIS,
    FILTER_DURATION,
    ORDER_DATE,
    SIGN_IN_SIGN_OUT,
    ORDER_BY_NAME,
    GET_MOVIES,
    FILTER_MOVIES_BY_COUNTRY,
    FILTER_MOVIES_BY_GENRE,
    ORDER_BY_RATING,
    GET_GENRES,
    GET_COUNTRIES
} from "./actionstype";

export function getMovies() { //obtener todos los videojuegos
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/films") 

        try {
            return dispatch({
                type: GET_MOVIES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function signInSignOut(boolean) {
    return {
        type: SIGN_IN_SIGN_OUT,
        payload: boolean,
    }
}

export function sortName(payload) { //ordenar por nombre asc o desc
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function getGenres() { //obtener generos
    return async function (dispatch) {
        let info = await axios.get("http://localhost:3001/genres");

        return dispatch({
            type: GET_GENRES,
            payload: info.data
        })
    }
}

export function getMoviesByGenre(payload) {
    return async function (dispatch) {
        try {
            let json3 = await axios.get('http://localhost:3001/films');
            let json4 = json3.data.filter(e => e.genres.includes(payload));
            return dispatch({
                type: FILTER_MOVIES_BY_GENRE,
                payload: json4
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getCountries() {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/countries");
            return dispatch({
                type: GET_COUNTRIES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getMoviesByCountry(payload) {
    return async function (dispatch) {
        try {
            let json3 = await axios.get('http://localhost:3001/films');
            let json4 = json3.data.filter(e => e.country === payload);
            return dispatch({
                type: FILTER_MOVIES_BY_COUNTRY,
                payload: json4
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function sortDate(order) {
    return {
        type: ORDER_DATE,
        payload: order
    }
}

export function orderByRating(payload) { //ordernar por rating asc o desc
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export function searchPelicula_Actor(search) {
    return function (dispatch) {
        axios.get("http://localhost:3001/films?search=" + search)
            .then((pelis) => {
                dispatch({
                    type: SEARCH_PELIS,
                    payload: pelis.data
                });
            })
            .catch((error) => {
                console.log(error)
            })
    };
}

/* 
export function filterDuration(duration) {
    return function (dispatch) {
        axios.get( RUTABACK  + duration)
        .then((movies) => {
            dispatch({
              type: FILTER_DURATION,
              payload: movies.data
            });
          })
          .catch((error)=>{
             console.log(error)
          })
        };
    }

  export function sortByComment(order){
return {
      type: ORDER_COMMENT,
      payload: order
  }
}
*/

//LOGICA PENDIENTE PARA TRABAJAR CUANDO VENGA INFO DEL BACK

/* export function getVideogames() { //obtener todos los videojuegos
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/videogames") //nos traemos los juegos

        try {
            return dispatch({
                type: "GET_VIDEOGAMES",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterCreated(payload) { //filtrar por creados
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function getNameVideogames(payload) { //obtener videojuegos por nombre
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/videogames?name=" + payload); //el payload viene siendo el nombre del juego
            return dispatch({
                type: "GET_NAME_VIDEOGAMES",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterByGenre(payload) {
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}

export function filterByRating(payload) {
    return {
        type: "FILTER_BY_RATING",
        payload
    }
}

export function postVideogame(payload) { //crear videojuego
    return async function () {
        const response = await axios.post("http://localhost:3001/videogame", payload);

        return response
    }
}

export function getDetail(payload) { //obtener detalle del videojuego(ID)
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/videogame/" + payload);

            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
} */

/* export function postMovie (payload){
    return async function(dispatch){
        try {
            var json = await axios.post("RUTA", payload);
            return json
        } catch (error) {
            console.log(error)
        }
    }
}; */

/*  export function getGenres (){
              return async function (dispatch){
                  try {
                      var json = await axios.get("URL");
                      return dispatch({
                          type: GET_GENRES,
                          payload: json.data
                      })
                  } catch (error) {
                      console.log(error)
                  }
              }
          };

        }; */