import createPalette from "@mui/material/styles/createPalette";
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
  // SIGN_UP_USER,
  SUBSCRIBE,
  GET_FAV,
  DELETE_USER_INFORMATION,
  // HANDLE_CAME_BACK_TO_BASIC,
  // GET_USER_INFO,
  GET_PLAN_INFO,
  PAY_SUBSCRIPTION,
  GET_PROFILE_INFO,
  VALIDATE_SUBSCRIPTION,
  DELETE_FAV,
  //comentarios
  ADD_COMMENT,
  UPDATE_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT
} from "./actionstype";

export function getMovies() {
  //obtener todos los videojuegos
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/films");

    try {
      return dispatch({
        type: GET_MOVIES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function sortName(payload) {
  //ordenar por nombre asc o desc
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function getGenres() {
  //obtener generos
  return async function (dispatch) {
    let info = await axios.get("http://localhost:3001/genres");

    return dispatch({
      type: GET_GENRES,
      payload: info.data,
    });
  };
}

// export function postMovie (movieForm){
//     return async function(dispatch){
//       const respo = await axios.post('http://localhost:3001/films', movieForm);
//       console.log("RESPUESTA DEL BACK: ",movieForm)
//     }
// };
export function postMovie(movieForm) {
  return async () => {
    const response = (
      await axios.post("http://localhost:3001/films", movieForm)
    )?.data;
    console.log("RESPUESTA: ", response);
    return { type: "POST_PELI", payload: response };
  };
}

export function getMoviesByGenre(payload) {
  return async function (dispatch) {
    try {
      let filtroGenre = [];
      let json3 = await axios.get("http://localhost:3001/films");
      json3.data.map((peli) => {
        let genre = peli.Genres;
        genre.forEach((obj) => {
          if (obj.name === payload) {
            filtroGenre.push(peli);
          }
        });
      });
      if (filtroGenre.length) {
        return dispatch({
          type: FILTER_MOVIES_BY_GENRE,
          payload: filtroGenre,
        });
      } else {
        return dispatch({
          type: FILTER_MOVIES_BY_GENRE,
          payload: ["No films"],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCountries() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/countries");
      console.log('response action', json.data)
      return dispatch({
        type: GET_COUNTRIES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getMoviesByCountry(payload) {
  return async function (dispatch) {
    try {
      let json3 = await axios.get("http://localhost:3001/films");
      let json4 = json3.data;
      json4 = json4.filter((e) => e.Country.name === payload);
      if (json4.length) {
        return dispatch({
          type: FILTER_MOVIES_BY_COUNTRY,
          payload: json4,
        });
      } else {
        return dispatch({
          type: FILTER_MOVIES_BY_COUNTRY,
          payload: ["No films"],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function sortDate(order) {
  return {
    type: ORDER_DATE,
    payload: order,
  };
}

export function orderByRating(payload) {
  //ordernar por rating asc o desc
  return {
    type: ORDER_BY_RATING,
    payload,
  };
}

export function searchPelicula_Actor(search) {
  return function (dispatch) {
    dispatch({
      type: SEARCH_PELIS,
      payload: search,
    });
  };
}

export function renderMovieDetails(id) {
  return async function (dispatch) {
    try {
      let movie = await axios.get(`http://localhost:3001/films/${id}`);
      /* console.log(movie.data) */
      return dispatch({
        type: MOVIE_DETAIL,
        payload: movie.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function signUpFunction(userData) {
  return async function (dispatch) {
    try {
      console.log("userData", userData);

      // let request = {
      // name: userData.given_name ? userData.given_name : null,
      // surname: userData.family_name ? userData.family_name : null,
      // username: userData.nickname,
      // email: userData.email,
      // password: userData.email,
      // creator: userData.creator,
      //ver misma situación que status
      // country: userData.country ? userData.country : null,
      // people: userData.people
      // ? userData.people === "true"
      // ? true
      // : false
      // : null,
      // rol: userData.rol ? userData.rol : null,
      // telephone: userData.telephone ? parseInt(userData.telephone) : null,
      // typeOfDocument: userData.typeOfDocument
      // ? userData.typeOfDocument
      // : null,
      // numberOfDocument: userData.numberOfDocument
      // ? Number(userData.numberOfDocument)
      // : null,
      // frontDocument: userData.frontDocument ? userData.frontDocument : null,
      // backDocument: userData.reverseDocument
      // ? userData.reverseDocument
      // : null,
      // status: userData.status ? userData.status: null,
      //no puede ser null, si no tiene. No se envía.
      //porque esto se ejecuta siempre y si le envio null voy a pisar el status actual
      //cuando se monta el Home
      // };
      await axios.post("http://localhost:3001/users/register", userData);
      // if (request.creator) {
      //   return dispatch({
      //     type: SIGN_UP_USER,
      //     payload: true,
      //   });
      // } else {
      // return dispatch({
      //   type: SIGN_UP_USER,
      //   payload: false,
      // });
      // }
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUser(userData) {
  return async function () {
    try {
      await axios.put("http://localhost:3001/users/modif", userData);
    } catch (error) {
      console.log("updateUserInformation action", error);
    }
  };
}

export function filterDuration(payload) {
  return async function (dispatch) {
    try {
      let json3 = await axios.get("http://localhost:3001/films");
      let json4 = json3.data;
      json4 = json4.filter((e) => e.duration === payload);
      if (json4.length) {
        return dispatch({
          type: FILTER_DURATION,
          payload: json4,
        });
      } else {
        return dispatch({
          type: FILTER_DURATION,
          payload: ["No films"],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getFavorites(id) {
  return async function (dispatch) {
    try {
      var pelisFav = await axios.get(
        `http://localhost:3001/users/getFavs/${id}`
      );
      return dispatch({
        type: GET_FAV,
        payload: pelisFav.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUserInformation(email) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/users/del`, {
        data: {
          email: email,
        },
      });
      // return dispatch({
      //   type: DELETE_USER_INFORMATION,
      // });
    } catch (error) {
      console.log("deleteUserInformation", error);
    }
  };
}

export function addFavFilm(payload) {
  return async function (dispatch) {
    await axios.post("http://localhost:3001/users/addFav", payload);
  };
}

export function deleteFavFilm(payload) {
  return async function (dispatch) {
    try {
      console.log("SOY PAYLOAD EN ACTIONS", payload);
      let response = await axios.delete("http://localhost:3001/users/delFav", {
        data: { payload },
      });

      let toPayload = {
        msg: response,
        id: payload.favDispatch.idPeli,
      };

      return dispatch({
        type: DELETE_FAV,
        payload: toPayload.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// export function getUserInfo(email) {
//   return async function (dispatch) {
//     try {
//       let response = await axios.get(
//         `http://localhost:3001/users/byemail`,
//         email
//       );
//       console.log("ISCREATOR", response);
//       return dispatch({
//         type: GET_USER_INFO,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log("getUserInfo", error);
//     }
//   };
// }

export function getProfileInfo(email) {
  return async function (dispatch) {
    try {
      console.log("EMAILL EN ACTIONS", email);
      let response = await axios.get(
        `http://localhost:3001/users/byemail/${email}`
      );
      return dispatch({
        type: GET_PROFILE_INFO,
        payload: response.data,
      });
    } catch (error) {
      console.log("getUserInfo", error);
    }
  };
}

export function validateSubscription(email) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3001/payment/validate/${email}`
      );
      dispatch({
        type: VALIDATE_SUBSCRIPTION,
        payload: response.data,
      });
    } catch (error) {
      console.log("validateSubscription", error);
    }
  };
}

export function updateSubscription(props) {
  return async function (dispatch) {
    try {
      let response = await axios.put(
        `http://localhost:3001/users/modif`,
        props
      );
      return dispatch({
        type: GET_PROFILE_INFO,
        payload: response.data,
      });
    } catch (error) {
      console.log("validateSubscription", error);
    }
  };
}

// export function cameBackToBasic(userData) {
//   return async function (dispatch) {
//     try {
//       let updatedUser = {
//         email: userData.email,
//         creator: userData.creator,
//       };
//       await axios.put(`http://localhost:3001/users/modif`, updatedUser);
//       return dispatch({
//         type: HANDLE_CAME_BACK_TO_BASIC,
//         payload: false,
//       });
//     } catch (error) {
//       console.log("handleCameBackToBasic", error);
//     }
//   };
// }

export function subscribe(payload) {
  return async function (dispatch) {
    try {
      const paymentInfo = await axios.post(
        "http://localhost:3001/payment/payment",
        payload
      );
      return dispatch({
        type: SUBSCRIBE,
        payload: paymentInfo.data,
      });
    } catch (err) {
      console.log("subscribe", err);
    }
  };
}

export function paySubscription(payload) {
  return async function (dispatch) {
    try {
      const paymentInfo = await axios.post(
        "http://localhost:3001/payment/subscription",
        payload
      );
      return dispatch({
        type: PAY_SUBSCRIPTION,
        payload: paymentInfo.data,
      });
    } catch (err) {
      console.log("subscribe", err);
    }
  };
}

export function getPlanInfo() {
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/plans/`);
      return dispatch({
        type: GET_PLAN_INFO,
        payload: response.data,
      });
    } catch (error) {
      console.log("getPlanInfo", error);
    }
  };
}

//comments

export function getComments(payload){
  return async function(dispatch){
    try{
      let response = await axios.get(`http://localhost:3001/comments/film/${payload}`);
      return dispatch({
        type: GET_COMMENTS,
        payload: response.data,
      });
    } catch (error) {
      console.log("getComments", error);
    }
  }
}

export function addComment(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.post(`http://localhost:3001/comments/`, payload);
      return dispatch({
        type: ADD_COMMENT,
        payload: response.data,
      });
    } catch (error) {
      console.log("AddComment", error);
    }
  };
}

//      {}
// El payload debe tener el id del comentario y 
// lo que se quiere modificar:
//    - body
export function updateComment(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.put(`http://localhost:3001/comments/modif`, payload);
      return dispatch({
        type: UPDATE_COMMENT,
        payload: response.data,
      });
    } catch (error) {
      console.log("updateComment", error);
    }
  };
}

export function deleteComment(id) {
  console.log("iddd", id)
  return async function(dispatch) {
    try{
      let response = axios.delete("http://localhost:3001/comments/del", {data: {id}})
      return dispatch({
        type: DELETE_COMMENT,
        payload: id
      });
    }
    catch(error){
      console.log(error)
    }
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
