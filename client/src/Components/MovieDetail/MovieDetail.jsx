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
import Swal from "sweetalert2";
import CafecitoBtn from "../CafecitoBtn/CafecitoBtn.jsx";
import { AppBar, Box, Paper, Typography } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";

const ImgFav = styled("img")({
  height: "700px",
  width: "auto",
});
const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center",
});
const PaperStyle = styled(Paper)({
  display: "flex",
  width: "550px",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: grey[900],
  borderRadius: 20,
  opacity: "90%",
});
const PaperStyle2 = styled(Paper)({
  display: "flex",
  width: "1080px",
  height: "auto",
  padding: 0,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: grey[900],
  borderRadius: 20,
});
const PaperStyle3 = styled(Paper)({
  display: "flex",
  width: 1150,
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: grey[900],
  borderRadius: 20,
  opacity: "90%",
});
const PaperStyle4 = styled(Paper)({
  display: "flex",
  width: "600px",
  padding: 10,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: 'transparent',
  borderRadius: 20,
  opacity: "90%",
  maxHeight:90,
  boxShadow:'none'
});
const PaperStyle5 = styled(Paper)({
  display: 'flex',
          flexWrap: 'wrap',
  padding: 45,        
  justifyContent: "space-between",
  width: 1150,
  backgroundColor: grey[900],
  borderRadius: 20,
  opacity: "90%",
});
const PaperStyle6 = styled(Paper)({
  display: "flex",
  width: "1000px",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  borderRadius: 20,
  backgroundColor: 'transparent',
  boxShadow:'none',
  
});
const PaperTop = styled(Paper)({
  display: "flex",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: 'transparent',
  borderRadius: 20,
  boxShadow:'none'
 
});
const PaperMid = styled(Paper)({
  display: "table-column",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: 'transparent',
  borderRadius: 20,
  boxShadow:'none'
 
});
const PaperBot = styled(Paper)({
  display: "flex",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: 'transparent',
  borderRadius: 20,
  boxShadow:'none'
 
});
const PaperTitulo = styled(Paper)({
 paddingBottom:100,
 backgroundColor:'transparent',
 boxShadow:'none'
 
});
const Titulo = styled(Typography)({
  color: "#e0e0e0",
  fontSize: "45px",
  fontFamily: "Koulen",
});
export default function MovieDetail() {
  let dispatch = useDispatch();

  let { id } = useParams();
  let filmId = id;
  const [loaded, setLoaded] = useState(false);

  const allMovies = useSelector(state => state.pelisfiltradas);
  const profileInfo = useSelector(state => state.profileInfo);

  console.log("PELICULA", allMovies);

  const pelisdeluser = allMovies.filter(peli => peli.UserId === profileInfo.id);

  /* console.log("USER", pelisdeluser); */

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const peli = useSelector(state => state.detalle);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(renderMovieDetails(id));
      if (user) {
        dispatch(getProfileInfo(user?.email));
        setLoaded(true);
      }
    }
  }, [dispatch, user]);

  const navigate = useNavigate();
  let elenco = peli ? peli.mainActors : [];

  let key = 0;

  const handleSignUp = () => {
    loginWithRedirect({
      screen_hint: "signup",
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <AppStyle>
          <Link to={"/"}>
            <img src={logo} alt="img not found" />
          </Link>
        </AppStyle>
        {Swal.fire({
          title: "Registrate para acceder a todo nuestro contenido",
          showCancelButton: true,
          cancelButtonAriaLabel: "Volver al home",
          confirmButtonColor: "#6200ea",
          cancelButtonColor: "#ffc107",
          confirmButtonText: "Registrarse",
          footer: "<span>Al cancelar volverá a home</span>",
          width: 600,
          padding: "1em",
          icon: "info",
          color: "#716add",
          background: "black",
          backdrop: `
            rgba(0,0,123,0.2)0  `,
        }).then((result) => {
          if (result.isConfirmed) {
            handleSignUp();
          } else {
            window.location.replace("http://localhost:3000/");
          }
        })}
      </>
    );
  }

  if (peli) {
    return (
      <>
        <AppStyle>
          <Link to={"/"}>
            <img src={logo} alt="img not found" />
          </Link>
        </AppStyle>
        <>
          {loaded ? (
            <Box>
              {/* <div className="detalles"> */}
              <div className="detalle3">
               
              </div>
              <PaperTop>
              <PaperStyle>
                <ImgFav src={peli.poster} alt="Poster" className="imgPoster" />
              </PaperStyle>
              {/* </div> */}
              <PaperMid>
              
              <PaperStyle5>
                <PaperTitulo><Box
                  height={100}
                  width={500}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor="#5e35b1"
                  color="#e0e0e0"
                  fontSize={24}
                  position={"relative"}
                  left={0}
                  top={50}
                  borderRadius={5}
                >
                  <Titulo variant="bold">{peli.title}</Titulo>
                </Box></PaperTitulo>
               <PaperStyle6>
                <PaperStyle4>
                  <h2>Rating: {peli.rating}</h2>

                  <h3>Año</h3>
                  <p>{peli.year}</p>
                </PaperStyle4>
                <PaperStyle4>
                  <h3>Elenco principal:</h3>
                  {elenco?.map((e, i) => {
                    return <p key={key++}>{e}</p>;
                  })}{" "}
                </PaperStyle4>
                </PaperStyle6>
                <PaperStyle6>
                <PaperStyle4> <PaperStyle4>
                  <h2>Genero:</h2>{" "}
                  <p>{peli.Genres?.map((a) => a.name).join(", ")}</p></PaperStyle4>
                  <h2>Pais de origen: </h2>
                  <p>{peli.Country?.name}</p>
                </PaperStyle4>
                {peli.associateProducer && (
                  <PaperStyle4><PaperStyle4>
                    <h3>Director:</h3>
                    <p>{peli.director}</p></PaperStyle4>
                    <h3>Productor Asociado:</h3>
                    <p>{peli.associateProducer}</p>
                  </PaperStyle4>
                )}</PaperStyle6> </PaperStyle5>
                
                <PaperStyle3>
                  <Box paddingRight={12} opacity={"100%"}>
                    <h3>Sinopsis:</h3>
                  </Box>
                  <p>{peli.synopsis}</p>
                </PaperStyle3></PaperMid></PaperTop>
              
                <PaperBot>
              <PaperStyle2>
                <View ubicacion={peli.url} />
              </PaperStyle2>
              <Comments
                userId={profileInfo?.id}
                filmId={Number(filmId)}
                // username={profileInfo?.username}
                username={user?.nickname}
                // image={profileInfo?.image}
                image={user?.picture}
              /></PaperBot> <div className="detalles4">
                {peli.cafecito && (
                  <CafecitoBtn linkCafecito={profileInfo.cafecito} />
                )}
                <FavButton filmId={filmId} />
              </div>
              <Footer />
            </Box>
          ) : (
            <div>
              <h2>Cargando...</h2>
            </div>
          )}
        </>
      </>
    );
  }
}
