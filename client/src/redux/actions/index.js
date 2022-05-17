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
  /* DELETE_USER_INFORMATION, */
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
  DELETE_COMMENT,
  GET_USERS,
  CLEAN_STATE,
  GET_PROFILE_INFO_BY_ID,
  CANCEL_SUBSCRIPTION,
  DELETE_EXCEDED_FILMS,
  DELETE_FILM,
  GET_PROFILE_INFO_BY_ID_USER,
  KEEP_FILM,
  GET_USER_HIDDEN_FILMS,
  KEEP_FILMS_ARRAY,
  DELETE_FILMS_USER,
} from "./actionstype";
import { SERVER_BACK } from "../../paths/path";

export function getMovies() {
  return async function (dispatch) {
    let json = await axios.get(`${SERVER_BACK}/films`);
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

export function getUsers() {
  return async function (dispatch) {
    let json = await axios.get(`${SERVER_BACK}/users`);
    try {
      return dispatch({
        type: GET_USERS,
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
    let info = await axios.get(`${SERVER_BACK}/genres`);
    return dispatch({
      type: GET_GENRES,
      payload: info.data,
    });
  };
}

export function postMovie(movieForm) {
  return async () => {
    const response = (await axios.post(`${SERVER_BACK}/films`, movieForm))
      ?.data;
    return { type: "POST_PELI", payload: response };
  };
}

export function deleteFilm(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${SERVER_BACK}/films/${id}`);
      return dispatch({
        type: DELETE_FILM,
      });
    } catch (error) {
      console.log("deleteFilm action", error);
    }
  };
}

export function keepFilm(peli) {
  return async function (dispacth) {
    const resp = await axios.put(`${SERVER_BACK}/films`, peli);
    return dispacth({
      type: KEEP_FILM,
    });
  };
}

export function keepFilmsArray(filmsArray) {
  return async function (dispacth) {
    // const resp = await axios.put(`${SERVER_BACK}/films`, filmsArray);
    // tenemos que pasarle el array de pelis a guardar, osea el array de pelis
    // a modificar su status en 'approved'.
    await axios.put(`${SERVER_BACK}/films/updateFilms`, filmsArray);
    // esta ruta devuelve un arreglo con los proyectos actualizado en 'approved'
    return dispacth({
      type: KEEP_FILMS_ARRAY,
    });
  };
}

export function deleteFilmsUser(email) {
  return async function (dispatch) {
    const resp = (
      await axios.delete(`${SERVER_BACK}/films/forUser`, { data: email })
    )?.data;
    return dispatch({ type: DELETE_FILMS_USER, payload: [] });
  };
}
export function deleteExcededFilms(filmsToDelete, userId) {
  return async function (dispatch) {
    try {
      // borro los pelis que exceden el limite
      await axios.delete(`${SERVER_BACK}/films/del`, {
        data: {
          filmsToDelete: filmsToDelete,
        },
      });
      // obtengo los pelis actuales del usuario
      let actualFilms = await axios.get(
        `${SERVER_BACK}/users/getFilmsById/${userId}`
      );
      return dispatch({
        type: DELETE_EXCEDED_FILMS,
        payload: actualFilms.data,
      });
    } catch (error) {
      console.log("deleteExcededFilms action", error);
    }
  };
}

export function getMoviesByGenre(payload) {
  return async function (dispatch) {
    try {
      let filtroGenre = [];
      let json3 = await axios.get(`${SERVER_BACK}/films`);
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

export function getUserHiddenFilms(email) {
  return async function (dispatch) {
    try {
      const user = (await axios.get(`${SERVER_BACK}/users/byemail/${email}`))
        ?.data;
      const resp = (await axios.get(`${SERVER_BACK}/films/hidden/${user.id}`))
        ?.data;
      return dispatch({
        type: GET_USER_HIDDEN_FILMS,
        payload: resp,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCountries() {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${SERVER_BACK}/countries`);
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
      let json3 = await axios.get(`${SERVER_BACK}/films`);
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
      let movie = await axios.get(`${SERVER_BACK}/films/${id}`);
      let autor = await axios.get(`${SERVER_BACK}/users/${movie.data.UserId}`);
      return dispatch({
        type: MOVIE_DETAIL,
        payload: {
          ...movie.data,
          cafecito: autor.data.cafecito,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanState() {
  return async function (dispatch) {
    return dispatch({
      type: CLEAN_STATE,
    });
  };
}

export function signUpFunction(userData) {
  return async function (dispatch) {
    try {
      await axios.post(`${SERVER_BACK}/users/register`, userData);
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUser(userData) {
  return async function () {
    try {
      await axios.put(`${SERVER_BACK}/users/modif`, userData);
    } catch (error) {
      console.log("updateUserInformation action", error);
    }
  };
}

export function filterDuration(payload) {
  return async function (dispatch) {
    try {
      let json3 = await axios.get(`${SERVER_BACK}/films`);
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
      var pelisFav = await axios.get(`${SERVER_BACK}/users/getFavs/${id}`);
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
      await axios.delete(`${SERVER_BACK}/users/del`, {
        data: {
          email: email,
        },
      });
    } catch (error) {
      console.log("deleteUserInformation", error);
    }
  };
}

export function addFavFilm(payload) {
  return async function (dispacth) {
    await axios.post(`${SERVER_BACK}/users/addFav`, payload);
  };
}

export function deleteFavFilm(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.delete(`${SERVER_BACK}/users/delFav`, {
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

export function getProfileInfo(email) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_BACK}/users/byemail/${email}`);
      return dispatch({
        type: GET_PROFILE_INFO,
        payload: response.data,
      });
    } catch (error) {
      console.log("getUserInfo", error);
    }
  };
}

export function getProfileInfoById(id) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_BACK}/users/${id}`);
      return dispatch({
        type: GET_PROFILE_INFO_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log("getUserInfoById", error);
    }
  };
}

export function getProfileInfoByIdListUser(id) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_BACK}/users/${id}`);
      return dispatch({
        type: GET_PROFILE_INFO_BY_ID_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log("getUserInfoById", error);
    }
  };
}

export function validateSubscription(email) {
  return async function (dispatch) {
    try {
      const val = (await axios.get(`${SERVER_BACK}/payment/validate/${email}`))
        ?.data;
      const user = (await axios.get(`${SERVER_BACK}/users/byemail/${email}`))
        ?.data;
      const resp = (await axios.get(`${SERVER_BACK}/films/hidden/${user.id}`))
        ?.data;
      return dispatch({
        type: VALIDATE_SUBSCRIPTION,
        payload: { user: val, films: resp },
      });
    } catch (error) {
      console.log("validateSubscription", error);
    }
  };
}

export function updateSubscription(props) {
  return async function (dispatch) {
    try {
      let response = await axios.put(`${SERVER_BACK}/users/modif`, props);
      return dispatch({
        type: GET_PROFILE_INFO,
        payload: response.data,
      });
    } catch (error) {
      console.log("validateSubscription", error);
    }
  };
}

// export function upgradeSubscription(payload) {
//   // el payload que llega es el nuevo plan.
//   return async function (dispatch) {
//     try {

//     } catch (error) {
//       console.log("upgradeSubscription action", error);
//     }
//   };
// }

export function subscribe(payload) {
  return async function (dispatch) {
    try {
      const paymentInfo = await axios.post(
        `${SERVER_BACK}/payment/payment`,
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
        `${SERVER_BACK}/payment/subscription`,
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

export function cancelSubscription(email) {
  return async function (dispatch) {
    try {
      //busco el id de la suscripción a cancelar.
      const id = await axios.get(`${SERVER_BACK}/payment/${email}`);
      //cancelo la suscripción.
      await axios.put(`${SERVER_BACK}/payment/cancel/${id.data}`);
      //actualizo la prop subscription en 'Free'
      const userUpdated = await axios.put(`${SERVER_BACK}/users/modif`, {
        email: email,
        subcription: "Free",
        status: "creator approved",
      });
      return dispatch({
        type: CANCEL_SUBSCRIPTION,
        payload: userUpdated.data,
      });
    } catch (error) {
      console.log("cancelSubscription action", error);
    }
  };
}

export function getPlanInfo() {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_BACK}/plans/`);
      return dispatch({
        type: GET_PLAN_INFO,
        payload: response.data,
      });
    } catch (error) {
      console.log("getPlanInfo", error);
    }
  };
}

export function getComments(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_BACK}/comments/film/${payload}`);
      return dispatch({
        type: GET_COMMENTS,
        payload: response.data,
      });
    } catch (error) {
      console.log("getComments", error);
    }
  };
}

export function addComment(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.post(`${SERVER_BACK}/comments/`, payload);
      return dispatch({
        type: ADD_COMMENT,
        payload: response.data,
      });
    } catch (error) {
      console.log("AddComment", error);
    }
  };
}

export function updateComment(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.put(`${SERVER_BACK}/comments/modif`, payload);
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
  return async function (dispatch) {
    try {
      let response = axios.delete(`${SERVER_BACK}/comments/del`, {
        data: { id },
      });
      return dispatch({
        type: DELETE_COMMENT,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
