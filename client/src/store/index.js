import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";  //redux thunk es un middleware que nos permite hacer cosas asincronicas en redux, basicamente le dice al front que espere lo que pida en el back, sin esto se rompe el codigo
import rootReducer from "../reducer";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); //se crea el store añadiendo el reducer,  habilitamos la extension de redux y usamos el middleware thunk