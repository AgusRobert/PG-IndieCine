import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";

export default function SearchRating ({setCurrentPage}) {

    /* const dispatch = useDispatch();

    const [rating, setRating] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setRating(e.target.value)
     }

     function handleSubmit(e){
        e.preventDefault();
        dispatch(filterByRating(rating));
        setRating("")
        setCurrentPage(1);
    } */

    return(
        <div>
            <input
            /* value={rating} */
            type="text"
            placeholder="Buscar por rating..."
            /* onChange={(e) => handleInputChange(e)} */
            />
            <button type="submit" /* onClick={(e) => handleSubmit(e)} */>Buscar</button>
        </div>
    )
}