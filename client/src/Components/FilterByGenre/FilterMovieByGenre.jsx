import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
/* import {getMoviesByGenre, getGenres} from "../actions"; */

export default function FilterMoviesByGenre(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);

  /*   function handleChange(e) {
        dispatch(getMoviesByGenre(e.target.value))
    };

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);
 */
    return (
        <div>
             <select /* onChange = {(e) => handleChange(e)} */>
             <option hidden={true}>Géneros</option>
                        {/* {genres.map((e) => (
                            <option key ={e.id} value={e.name}>{e.name}</option>
                        ))} */}
                    </select>
                   
        </div>
    )
}



/* 
case FILTER_MOVIES_BY_GENRE:
        return {
            ...state,
            movies: action.payload
        }; 
 */