import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Card from "../Card/Card.jsx"
import Footer from "../Footer/Footer.jsx"
import Header from '../Header/Header'
import { getMovies, getUserInfo, signUpFunction } from "../../redux/actions/index.js";
import { Container, Row } from "react-bootstrap";
import Cartas from "../Cartas/Cartas.jsx";



// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./style.css";
import "swiper/css/navigation";
import SwiperCore, {
    EffectCoverflow,
    Pagination,
    Navigation
} from "swiper/core";
import { useAuth0 } from "@auth0/auth0-react";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

// import "swiper/swiper.min.css";

export default function Home() {
    const { user, isAuthenticated } = useAuth0()

    const dispatch = useDispatch();

    const allMovies = useSelector(state => state.pelisfiltradas);

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch])

    useEffect(() => {
        if (user) {
            /* console.log(user) */
            dispatch(signUpFunction({
                ...user,
                creator: false,
            }))
            // este llamado es para que se actualice es isCreator en el store con el de la db.
            dispatch(getUserInfo())
        }
    }, [user, isAuthenticated])

    return (
        <>
                <Header position= "sticky" />
            <div className="container">
                <h2 className="Title">Estrenos:</h2>
                <Swiper
                    navigation={true}
                    effect={"coverflow"}
                    centeredSlides={true}
                    slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
                    loop={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true
                    }}
                    pagination={{
                        clickable: true
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src="https://images-na.ssl-images-amazon.com/images/I/71A0Ls9QIML._RI_.jpg" alt="img not found" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://es.web.img3.acsta.net/r_1280_720/medias/nmedia/18/70/00/92/19103927.jpg" alt="img not found" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://medias.unifrance.org/medias/24/118/30232/format_page/media.jpg" alt="img not found" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://m.media-amazon.com/images/I/61e+5v4kM3L._AC_.jpg" alt="img not found" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://imagenes.gatotv.com/categorias/peliculas/posters/los_sonambulos.jpg" alt="img not found" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://moviehaku.com/thumbs/films/400x590/Plaga-Zombie--Zona-Mutante--Revolucion-Toxica.jpg" alt="img not found" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.pinimg.com/736x/a3/08/2b/a3082ba53195867f0516469b7062871a.jpg" alt="img not found" />
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* <div className="slider">
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                        <img className="imgSwiper" src="https://swiperjs.com/demos/images/nature-1.jpg" alt="img not found"/>
                        </SwiperSlide>
                        <SwiperSlide>
                        <img className="imgSwiper" src="https://swiperjs.com/demos/images/nature-2.jpg" alt="img not found"/>
                        </SwiperSlide>
                        <SwiperSlide>
                        <img className="imgSwiper" src="https://swiperjs.com/demos/images/nature-3.jpg" alt="img not found"/>
                        </SwiperSlide>
                        <SwiperSlide>
                        <img className="imgSwiper" src="https://swiperjs.com/demos/images/nature-4.jpg" alt="img not found"/>
                        </SwiperSlide>
                        <SwiperSlide>
                        <img className="imgSwiper" src="https://swiperjs.com/demos/images/nature-5.jpg" alt="img not found"/>
                        </SwiperSlide>
                        <SwiperSlide>
                        <img className="imgSwiper" src="https://swiperjs.com/demos/images/nature-6.jpg" alt="img not found"/>
                        </SwiperSlide>
                        <SwiperSlide>
                        <img className="imgSwiper" src="https://swiperjs.com/demos/images/nature-7.jpg" alt="img not found"/>
                        </SwiperSlide>
                        <SwiperSlide>
                        <img className="imgSwiper" src="https://swiperjs.com/demos/images/nature-8.jpg" alt="img not found"/>
                        </SwiperSlide>
                        <SwiperSlide>
                        <img className="imgSwiper" src="https://swiperjs.com/demos/images/nature-9.jpg" alt="img not found"/>
                        </SwiperSlide>
                    </Swiper>
                </div> */}
            <div>
                <Container>
                    <Row md={6} lg={6} className="newdiv">
                        {
                            allMovies ? allMovies?.map(data => {
                                console.log("HOME",data)

                                let nombresGen = [];
                                let generos = data.Genres
                                generos.forEach(a => {
                                    nombresGen.push(a.name)
                                })

                                return (
                                    <div className="cardgrid" key={data.id}>
                                        <Link to={`/detail/${data.id}`}>
                                            <Cartas title={data.title}
                                                poster={data.poster}
                                                year={data.year}
                                                country={data.Country.name}
                                                genres={"Géneros: " + nombresGen.join(", ")}
                                                rating={data.rating}
                                                key={data.id}
                                                duration={data.duration}
                                                synopsis={data.synopsis} />
                                        </Link>
                                    </div>
                                )
                            }) :
                                <img src="https://i.pinimg.com/originals/3d/80/64/3d8064758e54ec662e076b6ca54aa90e.gif" alt="not found" />
                        }
                    </Row>
                    <div>
                        <Footer />
                    </div>
                </Container>
                {/* <div>
                        <a href="#" class="scroll-top" title="Ir arriba">
                            <i class="fa fa-angle-up"><b>^</b></i>
                        </a>
                    </div> */}
            </div>
            {/* <div>
                    <Footer/>
                </div> */}


            {/* <div className="pelis">
                {
                    allMovies ? allMovies?.map(data => {
                        let nombresGen = [];

                        let generos = data.Genres
                        generos.forEach(a => {
                            nombresGen.push(a.name)
                        })

                        return (
                            <div key={data.id}>
                                <Link key={data.id} to={"/detail/" + data.id}>
                                <Card title={data.title}
                                poster={data.poster}
                                year={data.year}
                                country={data.Country.name}
                                Genres={"Géneros: " + nombresGen?.join(", ")}
                                rating={"Rating: " + data.rating}
                                duration={"Duración: " + data.duration}
                                key={data.id} />
                                </Link>
                            </div> 
                        )
                    }) :
                    <img src="https://m.media-amazon.com/images/M/MV5BMDBjMmNkMDMtN2ZiYS00MDJiLTk5YWUtOTdhZjFmMjdmM2NhXkEyXkFqcGdeQXVyMjY4MzQzNDk@._V1_FMjpg_UX1000_.jpg" alt="not found" />
                }
                </div>
                <div>
                    <Footer/>
                </div> */}
        </>
    )
}
