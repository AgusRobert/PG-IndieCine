import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {/* getMoviesByCountry, getCountries */} from "../actions";

export function FilterMovieByCountry(){
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);

   /*  function handleChange(e) {
        dispatch(getMoviesByCountry(e.target.value))
    };

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);
 */
    return (
        <div>
             <select onChange = {(e) => handleChange(e)}>
             <option hidden={true}>Países</option>
                        {countries.map((e) => (
                            <option key ={e.id} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                   
        </div>
    )
}
