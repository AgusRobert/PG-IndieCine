import { SEARCH_PELIS } from "../actions/actionstype";

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
    default:
      return "hola";
  }
}

export default rootReducer;
