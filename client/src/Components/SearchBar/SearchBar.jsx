import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {searchPelicula_Actor} from "../../redux/actions/index"

export default function SearchBar () {
    
    const [search,setSearch] = useState ('')
    let dispatch = useDispatch()
    function onSubmit(e){
      e.preventDefault();
      dispatch (searchPelicula_Actor(search))
    }
    function onInputChange(e){
        e.preventDefault()
        setSearch (e.target.value)
    }
    return <div className='search'>
        <form onSubmit={onSubmit}>
            
            <input  placeholder="Busca una pelicula o actor..." type="text" onChange={onInputChange} value = {search} />
           <button type="submit" value="Search">Buscar</button> 
        </form>
        
    </div>
}