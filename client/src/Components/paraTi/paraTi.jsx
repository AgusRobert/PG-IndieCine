import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "material-ui";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, getMovies, getProfileInfo } from "../../redux/actions";
import { useState } from "react";


export default function ParaTi({userId}){
    const {user} = useAuth0()
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    const allMovies = useSelector((state) => state.peliculas);
    // const profileInfo = useSelector(state => state.profileInfo)

    const [loaded, setLoaded] = useState(false)
    
    console.log("USEEEER", userId)
    // dispatch(getFavorites(userId))
    useEffect(() => {
        if(userId){
            dispatch(getFavorites(userId))
        }
    },[])
    
    console.log("favoriteees", favorites)

    let genres = favorites.map(p => p.Genres.map(g => g.name)).flat()
    let genres2 = new Set(genres)
    let genres3 = [...genres2]
    let recomendados = []
    
    genres3.forEach(g => allMovies?.forEach(p => {if(p.Genres.includes(g))recomendados.push(g)}))
    
    console.log("GENEROOOOS", recomendados)
    return(
        <div>
            {/* {loaded? <h1>Cargo   {profileInfo.id}</h1>: <h1>Cargando</h1>} */}
           
            PARA TIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
            {/* {recomendados.length?.map(r => <Card/>)} */}
        </div>
    )
}