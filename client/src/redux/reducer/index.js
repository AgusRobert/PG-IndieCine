import { SEARCH_PELIS } from "../actions/actionstype";
import { LOG_IN_LOG_OUT } from "../actions/actionstype";

const initialState = {
  peliculas: [],
  pelisfiltradas: [],
  isLogedIn: false,
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
    case LOG_IN_LOG_OUT: {
      return {
        ...state,
        isLogedIn: !state.isLogedIn,
      };
    }
    default:
      return "hola";
  }
}

export default rootReducer;
