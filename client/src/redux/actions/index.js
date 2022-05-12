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
  DELETE_COMMENT,
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

export function validateSubscription(email) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${SERVER_BACK}/payment/validate/${email}`
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
