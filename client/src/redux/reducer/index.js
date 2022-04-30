import {
  SEARCH_PELIS,
  FILTER_DURATION,
  ORDER_DATE,
  IS_CREATOR,
  ORDER_BY_NAME,
  ORDER_COMMENT,
  GET_MOVIES,
  FILTER_MOVIES_BY_COUNTRY,
  FILTER_MOVIES_BY_GENRE,
  ORDER_BY_RATING,
  GET_GENRES,
  GET_COUNTRIES,
  MOVIE_DETAIL,
} from "../actions/actionstype";

import {
  DATE_DES,
  NAME_ASC,
  COM_DES,
  RATING_ASC
} from "./Ordercosntants";

const initialState = {
  peliculas: [],
  pelisfiltradas: [],
  isCreator: false,
  genres: [],
  countries: [],
  movieDetail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PELIS:
      // let pelisbuscadas = [...state.peliculas]
      // pelisbuscadas = pelisbuscadas.filter()
      return {
        ...state,
        pelisfiltradas: action.payload,
      };

    case GET_MOVIES:
      return {
        ...state,
        peliculas: action.payload,
          pelisfiltradas: action.payload,
      };
    case FILTER_DURATION:
      return {
        ...state,
        pelisfiltradas: action.payload,
      };
    case ORDER_DATE:
      let orderMoviesDate = [...state.pelisfiltradas];
      orderMoviesDate = orderMoviesDate.sort((a, b) => {
        if (a.year < b.year) {
          return action.payload === DATE_DES ? -1 : 1;
        }
        if (a.year > b.year) {
          return action.payload === DATE_DES ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        pelisfiltradas: orderMoviesDate,
      };
    case ORDER_COMMENT:
      let orderMoviesCom = [...state.pelisfiltradas];
      orderMoviesCom = orderMoviesCom.sort((a, b) => {
        if (a.comments.length < b.comments.length) {
          return action.payload === COM_DES ? -1 : 1;
        }
        if (a.comments.length > b.comments.length) {
          return action.payload === COM_DES ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        pelisfiltradas: orderMoviesCom,
      };
    case IS_CREATOR: {
      return {
        ...state,
        isCreator: action.payload,
      };
    }
    case ORDER_BY_NAME:
      let orderMoviesName = [...state.pelisfiltradas];
      orderMoviesName = orderMoviesName.sort((a, b) => {
        if (a.title < b.title) {
          return action.payload === NAME_ASC ? -1 : 1;
        }
        if (a.title > b.title) {
          return action.payload === NAME_ASC ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        pelisfiltradas: orderMoviesName,
      };
    case ORDER_BY_RATING:
      let orderMoviesRating = [...state.pelisfiltradas];
      orderMoviesRating = orderMoviesRating.sort((a, b) => {
        if (a.rating < b.rating) {
          return action.payload === RATING_ASC ? -1 : 1;
        }
        if (a.rating > b.rating) {
          return action.payload === RATING_ASC ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        pelisfiltradas: orderMoviesRating,
      };
    case FILTER_MOVIES_BY_COUNTRY:
      return {
        ...state,
        pelisfiltradas: action.payload,
      };
    case FILTER_MOVIES_BY_GENRE:
      return {
        ...state,
        pelisfiltradas: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };
    default:
      return "hola";
  }
}

export default rootReducer;