import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getMoviesByGenre, getGenres} from "../../redux/actions/index";

export default function FilterMoviesByGenre(){

    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genres);

    function handleChange(e) {
        dispatch(getMoviesByGenre(e.target.value))
    };

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    let key = 1

    return (
        <div>
             <select onChange = {(e) => handleChange(e)}>
             <option hidden={true}>Géneros</option>
                        {genres ? genres.map((e) => (
                            <option key ={key++} value={e.name}>{e.name}</option>
                        )) : null}
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