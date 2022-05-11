import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import View from "../Reproductor/videoplayer.js";
import { getProfileInfo, renderMovieDetails } from "../../redux/actions/index";
import logo from "./LOGO.png";
import "./style.css";
import FavButton from "../FavButton/FavButton.jsx";
import Comments from "../Comments/Comments";
import { styled } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";

const ImgFav = styled("img")({
  height: "400px",
  width: "auto",
});

export default function MovieDetail() {
  let dispatch = useDispatch();

  let { id } = useParams();
  let filmId = id;
  const [loaded, setLoaded] = useState(false)

  const { user } = useAuth0()

  useEffect(() => {
    dispatch(renderMovieDetails(id));
    if (user) {
      dispatch(getProfileInfo(user?.email))
      setLoaded(true)
    }
  }, [dispatch, user]);

  const peli = useSelector(state => state.detalle);
  const profileInfo = useSelector(state => state.profileInfo)

  let elenco = peli ? peli.mainActors : [];

  let key = 0;

  if (peli) {
    return (
      <div>
        <div className="logoIndex">
          <Link to={"/"}>
            <img src={logo} alt="img not found" />
          </Link>
        </div>
        <>
          {loaded ? (
            <>
              <div>
                <div className="detalles">
                  <h2>{peli.title}</h2>
                  <ImgFav src={peli.poster} alt="Poster" className="imgPoster" />
                </div>
                <div className="detalles2">
                  <h2>Rating: {peli.rating}</h2>
                  <h3>Sinopsis:</h3>
                  <p>{peli.synopsis}</p>
                  <h3>Director:</h3>
                  <p>{peli.director}</p>
                  <h3>Año</h3>
                  <p>{peli.year}</p>
                  <h3>Elenco principal:</h3>
                  {elenco?.map((e, i) => {
                    return <p key={key++}>{e}</p>;
                  })}
                  <h2>Genero: {peli.Genres?.map(a => a.name).join(", ")}</h2>
                  <h2>Pais de origen: {peli.Country?.name}</h2>
                  <h3>Productor Asociado</h3>
                  <p>{peli.associateProducer}</p>
                </div>
              </div>

              <div>
                <View ubicacion={peli.url} />
              </div>
              <FavButton filmId={filmId} />
              <div>
                <Comments
                  userId={profileInfo?.id}
                  filmId={Number(filmId)}
                  // username={profileInfo?.username}
                  username={user?.nickname}
                  // image={profileInfo?.image}
                  image={user?.picture}
                />
              </div>
              <div>
                <Footer />
              </div>
            </>
          ) : (
            <div>
              <h2>Cargando...</h2>
            </div>
          )}
        </>
      </div>
    );
  }
}
