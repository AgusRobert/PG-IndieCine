import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getVideogames, filterCreated, orderByName, orderByRating, filterByGenre, getGenres } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx"
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import style from "./Home.module.css"
import SearchRating from "../SearchRating/SearchRating";

export default function Home (){

    const dispatch = useDispatch();

    const allVideogames = useSelector (state => state.videogames); //con useSelector me trae a esta constante todo lo que esta en el estado de videogames ---- ES LO MISMO que usar mapStateToProps

    //---------------------- PAGINADO ---------------------------

    const [currentPage, setCurrentPage] = useState(1);  //con este estado local me guardo la pagina actual, arrancando en la 1

    const [videogamesPerPage, setVideogamesPerPage] = useState(15); //con este estado local me guardo cuantos videojuegos tendre por pagina

    const indexOfLastVideogame = currentPage * videogamesPerPage; //indice del ultimo personaje

    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; //indice del primer personaje

    const currentVideogame = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame); //tomo todos los juegos y selecciono los juegos que quiero, en este caso el indice del primero al ultimo indice con las variables creadas 1 al 15

    //-------------------------------------------------------------------

    const [orden, setOrden] = useState(""); //creo el estado de orden para poder renderizar

    const genres = useSelector((state) => state.genres); //me traigo el estado de generos

    const paginado = (pageNumber) => { //creo la funcion paginado, segun el numero de pagina que le pasen setea el estado de la pagina actual y hace que cambien los indices y asi muestra distintos juegos
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{ //funciona como componentDidMount, componentDidUpdate, componentWillUnmount
        dispatch(getGenres());
        dispatch(getVideogames()); //esto es lo mismo que usar mapDispatchToProps
    }, [dispatch]) //se pasa el dispatch para que siempre rendericen el componente, si estuviese vacio solo renderiza una vez

    function handleClick(e){ //funcion para volver a cargar todos los personajes
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterCreated(e){ //funcion para filtrar por videojuegos creados o existentes
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }

    function handleSort(e){ //funcion para filtrar por orden alfabetico
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); //al ordenar seteo para que comience en la primera pagina
        setOrden(e.target.value) //se usa para que haga la modificacion, la setee y renderice 
    }

    function handleRating(e){ //funcion para ordenar por rating
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value)
    }

    function handleGenres(e){ //funcion para ordenar por genero
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    return (
        <div>
            <div className={style.top_boton}>
            <button className={style.select} onClick={e => {handleClick(e)}}>
                Volver a cargar todos los personajes
            </button>
            <button className={style.select}>
                <Link className={style.select} to="/videogame">Crear Videojuego</Link>
            </button>
            </div>
            <div className={style.h1}>
            <h1>Bienvenido al mayor catálogo de Videojuegos</h1>
            </div>
                <div className={style.flex_filtros}>
                <select className={style.select} onChange={e => handleSort(e)}>
                    <option value="asc">Orden alfabético  de A hasta Z</option> {/* el value nos permite acceder y ver que opciones va a ejecutar la logica segun el value dado */}
                    <option value="desc">Orden alfabético  de Z hasta A</option>
                </select>
                <select className={style.select} onChange={e => handleRating(e)}>
                    <option value="peor">Rating del Peor al Mejor</option>
                    <option value="mejor">Rating del Mejor al Peor</option>
                </select>
                <select className={style.select} onChange={e => handleGenres(e)}>
                    <option value="All">Todos los Géneros</option>
                    {genres?.map(data => (
                        <option value={data.name} key={data.id}>{data.name}</option>
                    ))}
                </select>
                <select className={style.select} onChange={e => handleFilterCreated(e)}>
                    <option value="All">Todos los Videojuegos</option>
                    <option value="created">Videojuegos Creados</option>
                    <option value="api">Videojuegos Existente</option>
                </select>
                    <SearchBar
                    setCurrentPage={setCurrentPage}
                    />
                    <SearchRating
                    setCurrentPage={setCurrentPage}
                    />
                </div>
                {allVideogames.length > 15 ? (
                    <div className={style.paginado}>
                <Paginado videogamesPerPage={videogamesPerPage} //renderizamos el paginado 
                allVideogames={allVideogames.length}    //estos serian los params para el componente
                paginado={paginado} 
                currentPage={currentPage}
                />
                </div>
                ) :
                null}
                <div className={style.card}>
                {
                    currentVideogame.length !== 0 ? currentVideogame?.map(data => {
                        console.log(data)
                        return (
                            <div key={data.id} className={style.cards_item}>
                                <Link key={data.id} className={style.fix_card} to={"/home/" + data.id}>
                                <Card name={data.name}
                                image={data.image}
                                genres={"Géneros: " + data.genres?.join(", ")}
                                rating={"Rating: " + data.rating}
                                key={data.id} />
                                </Link>
                            </div> 
                        )
                    }) :
                    <img src="https://i.pinimg.com/originals/3d/80/64/3d8064758e54ec662e076b6ca54aa90e.gif" alt="not found" />
                }
                </div>
        </div>
    )
}