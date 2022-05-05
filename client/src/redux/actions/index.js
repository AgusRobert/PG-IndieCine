import axios from "axios";
import {
    SEARCH_PELIS,
    FILTER_DURATION,
    ORDER_DATE,
    ORDER_BY_NAME,
    GET_MOVIES,
    FILTER_MOVIES_BY_COUNTRY,
    FILTER_MOVIES_BY_GENRE,
    ORDER_BY_RATING,
    GET_GENRES,
    GET_COUNTRIES,
    MOVIE_DETAIL,
    SIGN_UP_USER,
    DELETE_USER_INFORMATION,
    HANDLE_CAME_BACK_TO_BASIC,
    GET_COMMENTS,
    POST_COMMENTS
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

// export function postMovie (movieForm){
//     return async function(dispatch){
//       const respo = await axios.post('http://localhost:3001/films', movieForm); 
//       console.log("RESPUESTA DEL BACK: ",movieForm)
//     }
// }; 

export const postMovie = async (movieForm) => {
    const respo = await axios.post("http://localhost:3001/films", movieForm);
    const poster = await axios.post("http://localhost:3001/upload/image", movieForm.poster);
    console.log("Respuesta del back: ", respo);
    console.log("datos del formulario: ", movieForm);
    console.log("resuesta del poster: ", poster);
    return null;
};

export function getMoviesByGenre(payload) {
    return async function (dispatch) {
        try {
            let filtroGenre = [];
            let json3 = await axios.get('http://localhost:3001/films');
            json3.data.map(peli => {
                let genre = peli.Genres;
                genre.forEach(obj => {
                    if (obj.name === payload) {
                        filtroGenre.push(peli)
                    }
                })
            })
            return dispatch({
                type: FILTER_MOVIES_BY_GENRE,
                payload: filtroGenre
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
            let json4 = json3.data;
            json4 = json4.filter(e => e.Country.name === payload)
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
        dispatch({
            type: SEARCH_PELIS,
            payload: search
        });
    };
}

export function renderMovieDetails(id) {
    return async function (dispatch) {
        try {
            let movie = await axios.get(`http://localhost:3001/films/${id}`)
            /* console.log(movie.data) */
            return dispatch({
                type: MOVIE_DETAIL,
                payload: movie.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function signUpFunction(userData) {
    return async function (dispatch) {
        try {
            let request = {
                name: userData.given_name ? userData.given_name : null,
                surname: userData.family_name ? userData.family_name : null,
                username: userData.nickname,
                email: userData.email,
                password: userData.email,
                creator: userData.creator,
                country: userData.country ? userData.country : null,
                people: userData.people ?
                    userData.people === "true" ?
                    true :
                    false : null,
                rol: userData.rol ? userData.rol : null,
                telephone: userData.telephone ? parseInt(userData.telephone) : null,
                typeOfDocument: userData.typeOfDocument ?
                    userData.typeOfDocument : null,
                numberOfDocument: userData.numberOfDocument ?
                    Number(userData.numberOfDocument) : null,
                frontDocument: userData.frontDocument ? userData.frontDocument : null,
                backDocument: userData.reverseDocument ?
                    userData.reverseDocument : null,
            };
            await axios.post("http://localhost:3001/users/register", request);
            if (request.creator) {
                return dispatch({
                    type: SIGN_UP_USER,
                    payload: true,
                });
            } else {
                return dispatch({
                    type: SIGN_UP_USER,
                    payload: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
}



export function filterDuration(payload) {
    return async function (dispatch) {
        try {
            let json3 = await axios.get('http://localhost:3001/films');
            let json4 = json3.data;
            json4 = json4.filter(e => e.duration === payload)
            return dispatch({
                type: FILTER_DURATION,
                payload: json4
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function deleteUserInformation(email) {
    return async function (dispatch) {
        try {
            await axios.delete(`http://localhost:3001/users/del`, email);
            return dispatch({
                type: DELETE_USER_INFORMATION,
            });
        } catch (error) {
            console.log('deleteUserInformation', error)
        }
    }
}
export function cameBackToBasic(userData) {
    return async function (dispatch) {
        try {
            let updatedUser = {
                email: userData.email,
                creator: userData.creator,
            }
            await axios.put(`http://localhost:3001/users/modif`, updatedUser);
            return dispatch({
                type: HANDLE_CAME_BACK_TO_BASIC,
            })
        } catch (error) {
            console.log('handleCameBackToBasic', error)
        }
    }
}

export function getComments(payload) {
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/comments/film/" + payload)

        try {
            return dispatch({
                type: GET_COMMENTS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postComment(payload) {
    return async function () {
        const response = await axios.post("http://localhost:3001/comments", payload);

        return response
    }
}

/* 
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