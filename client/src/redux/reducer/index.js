import {
  SEARCH_PELIS,
  FILTER_DURATION,
  ORDER_DATE,
  ORDER_BY_NAME,
  ORDER_COMMENT,
  GET_MOVIES,
  FILTER_MOVIES_BY_COUNTRY,
  FILTER_MOVIES_BY_GENRE,
  ORDER_BY_RATING,
  GET_GENRES,
  GET_COUNTRIES,
  MOVIE_DETAIL,
  // SIGN_UP_USER,
  GET_FAV,
  // DELETE_USER_INFORMATION,
  // CAME_BACK_TO_BASIC,
  // GET_USER_INFO,
  GET_PLAN_INFO,
  PAY_SUBSCRIPTION,
  GET_PROFILE_INFO,
  VALIDATE_SUBSCRIPTION,
  DELETE_FAV,
  // comments
  ADD_COMMENT,
  UPDATE_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
} from "../actions/actionstype";

import { DATE_DES, NAME_ASC, COM_DES, RATING_ASC } from "./Ordercosntants";

const initialState = {
  peliculas: [],
  pelisfiltradas: [],
  // isCreator: false,
  genres: [],
  countries: [],
  detalle: {},
  favorites: [],
  plans: [],
  paymentLink: "",
  profileInfo: {},
  comments: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PELIS:
      let pelisporfiltrar = state.peliculas;

      const filtro = (array, genre) => {
        let contador = false;

        for (let i = 0; i < array.length; i++) {
          if (array[i].name.toLowerCase().indexOf(genre) !== -1) {
            contador = true;
          }
        }
        return contador;
      };

      let peliFiltro = pelisporfiltrar.filter((data) => {
        if (
          data.title.toLowerCase().indexOf(action.payload.toLowerCase()) !==
            -1 ||
          data.director.toLowerCase().indexOf(action.payload.toLowerCase()) !==
            -1 ||
          data.mainActors
            .join(" ")
            .toLowerCase()
            .indexOf(action.payload.toLowerCase()) !== -1 ||
            filtro(data.Genres, action.payload.toLowerCase())||
            data.Country.name.toLowerCase().indexOf(action.payload.toLowerCase()) !==
              -1
        ) {
          return data;
        }
      });
      if (peliFiltro.length) {
        return {
          ...state,
          pelisfiltradas: peliFiltro,
        };
      } else {
        return {
          ...state,
          pelisfiltradas: ["No films"],
        };
      }

    case GET_MOVIES:
      return {
        ...state,
        peliculas: action.payload,
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
      if (orderMoviesDate.length) {
        return {
          ...state,
          pelisfiltradas: orderMoviesDate,
        };
      } else {
        return {
          ...state,
          pelisfiltradas: ["No films"],
        };
      }

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
      if (orderMoviesCom.length) {
        return {
          ...state,
          pelisfiltradas: orderMoviesCom,
        };
      } else {
        return {
          ...state,
          pelisfiltradas: ["No films"],
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
      if (orderMoviesName.length) {
        return {
          ...state,
          pelisfiltradas: orderMoviesName,
        };
      } else {
        return {
          ...state,
          pelisfiltradas: ["No films"],
        };
      }

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
      if (orderMoviesRating.length) {
        return {
          ...state,
          pelisfiltradas: orderMoviesRating,
        };
      } else {
        return {
          ...state,
          pelisfiltradas: ["No films"],
        };
      }

    case FILTER_DURATION:
      return {
        ...state,
        pelisfiltradas: action.payload,
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
      console.log('payload de countries', action.payload)
      return {
        ...state,
        countries: action.payload,
      };

    case MOVIE_DETAIL:
      console.log('movie detail reducer', action.payload)
      return {
        ...state,
        detalle: action.payload /* Object.keys(action.payload) */,
      };

    // case SIGN_UP_USER:
    //   return {
    //     ...state,
    //     isCreator: action.payload,
    //   };

    case GET_FAV:
      return {
        ...state,
        favorites: action.payload,
      };

    // case DELETE_USER_INFORMATION:
    //   return {
    //     ...state,
    //     isCreator: false,
    //   };

    // case CAME_BACK_TO_BASIC:
    // return {
    //   ...state,
    //   isCreator: action.payload,
    // };

    // case GET_USER_INFO:
    //   let response = action.payload.creator;
    //   return {
    //     ...state,
    //     isCreator: response,
    //   };

    case GET_PROFILE_INFO:
      // console.log("QUE LLEGA AL REDUCER", action.payload);
      return {
        ...state,
        profileInfo: action.payload,
      };

    // case GET_USER_INFO:
    //   let response = action.payload.creator
    //   return {
    //     ...state,
    //     isCreator: response,
    // };

    case VALIDATE_SUBSCRIPTION:
      let updatedSubscription = "Free";
      if ((action.payload.results[0].status = "pending")) {
        updatedSubscription = action.payload.results[2].reason;
        return {
          ...state,
          profileInfo: {
            ...state.profileInfo,
            subcription: updatedSubscription,
          },
        };
      }

    case GET_PLAN_INFO:
      return {
        ...state,
        plans: action.payload,
      };

    case DELETE_FAV:
      let deletedFavs = state.favorites.filter((p) => p.id !== action.payload);
      console.log("DELETED FAVS", deletedFavs);
      return {
        ...state,
        favorites: deletedFavs,
      };

    case PAY_SUBSCRIPTION:
      return {
        ...state,
        paymentLink: action.payload.init_point,
      };

    // comments y en estado inicial
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      }

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case UPDATE_COMMENT:
      let updatedComments = state.comments.map((comment) => {
        if (comment.id === action.payload.id) {
          return action.payload;
        }
        return comment;
      });
      return {
        ...state,
        comments: updatedComments,
      };
    case DELETE_COMMENT:
      let filteredComments = state.comments.filter( c => c.id !== action.payload)
      return{
        ...state,
        comments: filteredComments
      }
    default:
      return state;
  }
}

export default rootReducer;
