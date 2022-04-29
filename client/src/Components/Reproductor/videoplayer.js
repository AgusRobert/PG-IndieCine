import React from "react";
import ReactPlayer from "react-player";
import styles from "./View.module.css";

//queremos hacer un get del url de la peli( nos traemos en un estado la info de la peli y aca hacemos un destructuring ) 

export function View(url){

    const peli = (url);
    return(
        <div className={styles.contenedor}>
           <ReactPlayer
            url= {require(`${peli}`)}
            width="1280px"
            height="720px"
            controls={true}
            playing={true}
            className={styles.reactPlayer}
           />
        </div>
    )
}