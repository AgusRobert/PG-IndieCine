//LOGICA A LA ESPERA DEL BACK
import { SEARCH_PELIS } from "../actions/actionstype";
const initialState = { 
    peliculas:[],
    pelisfiltradas:[]
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_PELIS:
            if(action.payload.length===0){
              alert('No encontramos esa busqueda :(')
            } else{
              return {
                 ...state,
                 pelisfiltradas: action.payload,
               }
            };
    }
}

export default rootReducer;