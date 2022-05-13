import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "material-ui";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, getMovies, getProfileInfo } from "../../redux/actions";
import { useState } from "react";


export default function ParaTi({profileInfo}){
    const {user} = useAuth0()
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    const allMovies = useSelector((state) => state.peliculas);
    // const profileInfo = useSelector(state => state.profileInfo)

    const [loaded, setLoaded] = useState(false)
    
    console.log("USEEEER", user?.email)
    useEffect(() => {
        dispatch(getFavorites(profileInfo?.id))
    },[dispatch])
    
    // useEffect(() => {
    //     console.log("entre al segundo use")
    //     if(!profileInfo?.id){
    //         if(user) {dispatch(getProfileInfo(user?.email))
    //         setLoaded(true)}
    //     }
    // },[])

    console.log("favoriteees", favorites)
    console.log("PROFILE INFOO", profileInfo)

    let genres = favorites.map(p => p.genres)
    let recomendados = allMovies.filter(peli => peli.genres?.includes(genres[genres.length-1]))
    console.log("GENEROOOOS", genres)

    return(
        <div>
            {loaded? <h1>Cargo   {profileInfo.id}</h1>: <h1>Cargando</h1>}
           
            PARA TIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
            {/* {recomendados.length?.map(r => <Card/>)} */}
        </div>
    )
}