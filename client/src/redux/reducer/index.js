//LOGICA A LA ESPERA DEL BACK

const initialState = { //estados iniciales
    /* videogames: [],
    allVideogames: [],
    genres: [],
    detail: [] */
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