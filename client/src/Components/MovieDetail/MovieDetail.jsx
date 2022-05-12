import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import View from "../Reproductor/videoplayer.js";
import { getProfileInfo, renderMovieDetails } from "../../redux/actions/index";
import logo from "./LOGO.png";
import "./style.css";
import FavButton from "../FavButton/FavButton.jsx";
import Comments from "../Comments/Comments";
import { styled } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2'

const ImgFav = styled("img")({
  height: "400px",
  width: "auto",
});

export default function MovieDetail() {
  let dispatch = useDispatch();

  let { id } = useParams();
  let filmId = id;
  const [loaded, setLoaded] = useState(false)

  const { user, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(renderMovieDetails(id));
      if (user) {
        dispatch(getProfileInfo(user?.email))
        setLoaded(true)
      }
    }
  }, [dispatch, user]);

  const peli = useSelector(state => state.detalle);
  const profileInfo = useSelector(state => state.profileInfo)
  const navigate = useNavigate()
  let elenco = peli ? peli.mainActors : [];

  let key = 0;

  const handleSignUp = () => {
    loginWithRedirect({
      screen_hint: "signup",
    })
  }

  if (!isAuthenticated) {
    return (
      <>

        <div className="logoIndex">
          <Link to={"/"}>
            <img src={logo} alt="img not found" />
          </Link>
        </div>
        {/* {Swal.fire({
          title: 'Registrate para acceder a todo nuestro contenido',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ir al home',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/")
          }
        })
        } */}
        {/* {
          Swal.fire({
            title: 'Registrate para acceder a todo nuestro contenido',
          })
        } */}
        <div>
          <h2>Registrate para acceder a todo nuestro contenido</h2>
        </div>
      </>
    )
  }

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
                  {peli.associateProducer && (
                    <>
                      <h3>Productor Asociado</h3>
                      <p>{peli.associateProducer}</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <View ubicacion={peli.url} />
              </div>
              <div>
                {profileInfo.cafecito && (
                  <a
                    href={profileInfo.cafecito}
                    rel='noopener'
                    target='_blank'>
                    <img srcset='https://cdn.cafecito.app/imgs/buttons/button_3.png 1x, https://cdn.cafecito.app/imgs/buttons/button_3_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_3_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_3.png' alt='Invitame un café en cafecito.app' /></a>
                )}
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
