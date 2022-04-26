import React from "react";

export default function Paginated ({videogamesPerPage, allVideogames, paginado, currentPage}){

    const pageNumbers = []

    for (let i = 1; i < Math.ceil(allVideogames/videogamesPerPage); i++) { //voy a recorrer el arreglo en donde voy a tomar el numero redondeado que resulta dividir todos los juegos por el numero de juegos por pagina que yo quiero y lo pusheo // ejemplo 100 juegos dividido por 15 juegos por pagina, me da 6.6 paginas, redondeo a 7 paginas para mostrar
        pageNumbers.push(i)
    }

    return (
        <div>
            {currentPage > 1 ? 
            <button onClick={() => paginado(currentPage - 1)}>
                <a>Volver</a>
            </button> :
            null}
            <button onClick={() => paginado(currentPage)}>
                    <a>{currentPage}</a>
            </button>
            {currentPage < allVideogames/videogamesPerPage ?
            <button onClick={() => paginado(currentPage + 1)}>
                <a>Siguiente</a>
            </button> :
            null}
        </div>
        )
}