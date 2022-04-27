import {SEARCH_PELIS , FILTER_DURATION , ORDER_DATE } from "../actions/actionstype";

const initialState = {
  peliculas: [],
  pelisfiltradas: [],
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
      }
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
    default:
      return "hola";
  }
}

export default rootReducer;
