import {
  SEARCH_PELIS,
  FILTER_DURATION,
  ORDER_DATE,
  SIGN_IN_SIGN_OUT,
  ORDER_BY_NAME
} from "../actions/actionstype";

import { DATE_DES, NAME_ASC } from "./Ordercosntants";

const initialState = {
  peliculas: [],
  pelisfiltradas: [],
  isSignIn: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PELIS:
      if (action.payload.length === 0) {
        alert("No encontramos esa busqueda :(");
      } else {
        return {
          ...state,
          pelisfiltradas: action.payload,
        };
      };
    case FILTER_DURATION:
      return {
        ...state,
        pelisfiltradas: action.payload,
      };
    case ORDER_DATE:
      let orderMoviesDate = [...state.pelisfiltradas];
      orderMoviesDate = orderMoviesDate.sort((a, b) => {
        if (a.date < b.date) {
          return action.payload === DATE_DES ? -1 : 1;
        }
        if (a.date > b.date) {
          return action.payload === DATE_DES ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        pelisfiltradas: orderMoviesDate,
      };
    case SIGN_IN_SIGN_OUT: {
      return {
        ...state,
        isSignIn: action.payload,
      };
    }
    case ORDER_BY_NAME:
      let sortedArr = action.payload === NAME_ASC ? state.peliculas.sort(function (a, b) { //si es ascendente
          if (a.name > b.name) { // accede al estado videogames y le hace un sort
              return 1; // los ordena de manera ascendente
          }
          if (b.name > a.name) {
             return -1;
          }
          return 0
          }) :
          state.peliculas.sort(function (a, b) { //sort ordena por unicode, las letras tienen un valor asignado
            if (a.name > b.name) {
               return -1
           }
            if (b.name > a.name) {
             return 1
            }
            return 0
           })
            return {
                ...state,
                peliculas: sortedArr
            }
    default:
      return "hola";
  }
}

export default rootReducer;
