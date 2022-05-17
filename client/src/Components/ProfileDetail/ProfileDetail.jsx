import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfileInfoById } from "../../redux/actions";
import CafecitoBtn from "../CafecitoBtn/CafecitoBtn";
import Footer from "../Footer/Footer";
import logo from '../MovieDetail/LOGO.png';

export default function ProfileDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { profileInfo } = useSelector(state => state);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(getProfileInfoById(id));
        setLoaded(true);
    }, []);

    return (
        <>
            <div className="logoIndex">
                <Link to={"/"}>
                    <img src={logo} alt="img not found" />
                </Link>
            </div>
            {loaded ? (

                <div>
                    <h1>Datos del autor</h1>
                    <div>
                        <h2>{profileInfo.username}</h2>
                        <img src={profileInfo.image} />
                        {profileInfo.name && <h4>Nombre: {profileInfo.name}</h4>}
                        {profileInfo.surname && <h4>Apellido: {profileInfo.surname}</h4>}
                        <h4>Email de contacto: {profileInfo.email}</h4>
                        <h4>Lugar de origen: {profileInfo.country}</h4>
                        <h4>Breve descripción: ...soy Fulano, me apasionan las peliculas... </h4>
                        <br />
                        <h4>Sus películas favoritas: </h4>
                        <br />
                        <h4>Si desea apoyar el trabajo de este autor, puede hacerlo invitandole un cafecito:</h4>
                        {profileInfo.cafecito ? (
                            <>
                                <CafecitoBtn
                                    linkCafecito={profileInfo.cafecito}
                                />
                            </>
                        ) : (
                            <>
                                <p>Este autor no tiene cafecito.</p>
                            </>
                        )}
                    </div>
                    <br />
                    <div>
                        <h2>Sus películas: </h2>
                        
                    </div>
                    <Footer />
                </div>
            ) : (
                <div>
                    <h2>Cargando...</h2>
                </div>
            )}
        </>
    )
}