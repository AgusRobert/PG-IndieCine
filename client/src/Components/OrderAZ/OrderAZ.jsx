import React, { useState, useEffect } from "react";
import { getMovies, sortName } from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { NAME_ASC, NAME_DES } from '../../redux/reducer/Ordercosntants';

export default function OrderAZ (){

    const allMovies = useSelector (state => state.pelisfiltradas);
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getMovies());
    }, [dispatch])

    /* const [orden, setOrden] = useState("");

    const [currentPage, setCurrentPage] = useState(1); */

    function handleSort(e){
        e.preventDefault();
        dispatch(sortName(e.target.value));
        /* setCurrentPage(1);
        setOrden(e.target.value); */
    }

    return (
       
       
        <div>
            <select onChange={e => handleSort(e)}>
                    <option value='' hidden={true}>Orden Alfabético</option>
                    <option value={NAME_ASC}>Orden alfabético  de A hasta Z</option>
                    <option value={NAME_DES}>Orden alfabético  de Z hasta A</option>
                </select>
        </div>
        
    )
}