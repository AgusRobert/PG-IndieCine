import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import {
  getMovies,
  getProfileInfoById,
} from "../../redux/actions/index";
import { styled } from "@mui/system";
import Cartas from "../Cartas/Cartas.jsx";
import {
  cleanState,
  getProfileInfo,
  renderMovieDetails,
} from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import CafecitoBtn from "../CafecitoBtn/CafecitoBtn.jsx";
import { AppBar, Box, Paper, Typography } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";


const ImgFav = styled("img")({
  height: "auto",
  width: "auto",
});
/* const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center",
}); */
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
  backgroundColor: "transparent",
  borderRadius: 20,
  opacity: "90%",
  maxHeight: 90,
  boxShadow: "none",
});
const PaperStyle5 = styled(Paper)({
  display: "flex",
  flexWrap: "wrap",
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
  backgroundColor: "transparent",
  boxShadow: "none",
});
const PaperTop = styled(Paper)({
  display: "flex",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: 20,
  boxShadow: "none",
});
const PaperMid = styled(Paper)({
  display: "table-column",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: 20,
  boxShadow: "none",
});
const PaperBot = styled(Paper)({
  display: "flex",
  padding: 25,
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: 20,
  boxShadow: "none",
});
const PaperTitulo = styled(Paper)({
  paddingBottom: 100,
  backgroundColor: "transparent",
  boxShadow: "none",
});
const Titulo = styled(Typography)({
  color: "#e0e0e0",
  fontSize: "45px",
  fontFamily: "Koulen",
});

const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center",
});

const BoxStyle = styled(Box)({
  paddingTop: 50,
  justifyContent: "space-evenly",
  alignItems: "center",
  paddingBottom: 0,
  alignContent: "center",
  justifyItems: "flex-end",
});

export default function UserProfile() {
  let dispatch = useDispatch();

  let { id } = useParams();
  let filmId = id;

  const allMovies = useSelector((state) => state.pelisfiltradas);
  const profileInfo = useSelector((state) => state.profileInfo);

  /* console.log(profileInfo); */ //PROPIEDADES USUARIO DEL PERFIL

  const pelisdeluser = allMovies.filter(
    (peli) => peli.UserId === profileInfo.id
  );

  let idPeli = pelisdeluser.map((a) => a.id);

  /* console.log(pelisdeluser); */ //PELICULAS DEL USUARIO DEL PERFIL

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getProfileInfoById(filmId));
  }, [dispatch]);

/*   return (
    <>
      <AppStyle>
        <Link to={"/"}>
          <img src={logo} alt="img not found" />
        </Link>
      </AppStyle>
      <BoxStyle>
        <div>
          <h1>{profileInfo?.name + " " + profileInfo?.surname}</h1>
        </div>
        <div>
          <img src={profileInfo?.image} />
        </div>
        <div>
          <h1>{profileInfo?.country}</h1>
        </div>
        <div>
          <h1>{profileInfo?.cafecito}</h1>
        </div>
        <div>
          <h1>{profileInfo?.rol}</h1>
        </div>
        <div>
          <h1>{profileInfo?.username + " <- USERNAME"}</h1>
        </div>

        <div>
          {pelisdeluser ? (
            pelisdeluser?.map((data) => {
              console.log(data);
              return (
                <div>
                  <Cartas
                    id={data.id}
                    title={data.title}
                    poster={data.poster}
                  />
                </div>
              );
            })
          ) : (
            <img
              src="https://i.pinimg.com/originals/3d/80/64/3d8064758e54ec662e076b6ca54aa90e.gif"
              alt="not found"
            />
          )}
        </div>
      </BoxStyle>
    </>
  );
}
 */

return (
  <>

    
    <>
      

        <Box>
          
          {/* <div className="detalles"> */}
          <div className="detalle3"></div>
          <PaperTop>
            <PaperStyle>
              <ImgFav
                src={profileInfo?.image}
                alt="Poster"
                className="imgPoster"
                height= "300px"
              />
            </PaperStyle>
            {/* </div> */}
            <PaperMid>
              <PaperStyle5>
                <PaperTitulo>
                  <Box
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
                    <Titulo variant="bold">{profileInfo?.name}</Titulo>
                  </Box>
                  
                </PaperTitulo>
                <PaperStyle6>
                 
                 
                </PaperStyle6>
                <PaperStyle6>
                  <PaperStyle4>
                    {" "}
                   
                    <h2>Pais de origen: </h2>
                    <p>{profileInfo?.country}</p>
                  </PaperStyle4>
                  
                </PaperStyle6>{" "}
              </PaperStyle5>

              
            </PaperMid>
          </PaperTop>
          <PaperBot>
            
            
          </PaperBot>{" "}
          <div className="detalles4">
            {profileInfo?.cafecito && (
              <CafecitoBtn linkCafecito={profileInfo.cafecito} />
            )}
            


            <div>
          {pelisdeluser ? (
            pelisdeluser?.map((data) => {
              console.log(data);
              return (
                <div>
                  <Cartas
                    id={data.id}
                    title={data.title}
                    poster={data.poster}
                  />
                </div>
              );
            })
          ) : (
            <img
              src="https://i.pinimg.com/originals/3d/80/64/3d8064758e54ec662e076b6ca54aa90e.gif"
              alt="not found"
            />
          )}
        </div>
            
          </div>
          <Footer />
        </Box>
       
    </>
  </>
);
}

