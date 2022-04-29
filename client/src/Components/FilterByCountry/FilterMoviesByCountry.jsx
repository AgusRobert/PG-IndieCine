import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getMoviesByCountry, getCountries} from "../../redux/actions/index";

export default function FilterMovieByCountry(){

    const dispatch = useDispatch();

    const countries = useSelector((state) => state.countries);

    function handleChange(e) {
        dispatch(getMoviesByCountry(e.target.value))
    };

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);

    let key = 1;

    return (
        <div>
             <select onChange = {(e) => handleChange(e)}>
             <option hidden={true}>Países</option>
                        {countries ? countries.map((e) => (
                            <option key ={key++} value={e.name}>{e.name}</option>
                        )) : null}
                    </select>
                   
        </div>
    )
}
