import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Footer from "../Footer/Footer.jsx"
import Navbar from "../Navbar/Navbar.jsx";
import { View } from "../Reproductor/videoplayer.js";
export default function MovieDetail() {
  let peli = useSelector((state) => state.movieDetail);
  let { id } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(renderMovieDetails());
  }, []);

  let {url} = peli
  let elenco =peli.mainActors;

  return (
    <div>
      <>
        <div>
          <Navbar />
        </div>
        <div>
          <div>
            <h2>{peli.title}</h2>
            <img src={peli.poster} alt="Poster" />
          </div>
          <h2>Rating: {peli.rating}</h2>
          <h3>Sinopsis:</h3>
          <p>{peli.synopsis}</p>
          <h3>Director:</h3>
          <p>{peli.director}</p>
          <h3>Elenco principal:</h3> 
        {elenco.map((e,i) => {
            return (
              <p>{e}</p>
            );
          })}
          <h2>Genero: {peli.genres}</h2>
          <h2>Pais de origen: {peli.country}</h2>
        </div>

        <div><View
         url={url}/></div>
        <div>
          <span>Comentarios</span>
        </div>
        <div>
          <Footer />
        </div>
      </>
    </div>
  );
}
