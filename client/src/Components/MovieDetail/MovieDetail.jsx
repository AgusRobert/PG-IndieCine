import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Footer from "../Footer/Footer.jsx"
import Navbar from "../Navbar/Navbar.jsx";

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:3001/api/films/").then((response) => {
      setMovie(response.data);
    });
    return () => {
      setMovie(null);
    };
  }, []);
  let peli = movie[0];
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

        <div>COMPONENTE VIDEO</div>
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
