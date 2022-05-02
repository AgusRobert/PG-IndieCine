import React from "react";
import Footer from "../Footer/Footer.jsx"
import { Link } from "react-router-dom";
import logo from "../Header/LOGO.png";

export default function About(){
    return (
       <>
       <div className="logoIndex">
         <Link to={'/'}><img src={logo}  alt="img not found"/></Link>
       </div>
       <h1>Sobre nosotros</h1>
       <p style={{fontSize: '22px'}}>Somos un grupo de compañeros de estudio de distintos puntos de Latinoamérica que decidimos desarrollar esta Web como proyecto final de nuestra carrera de Full Stack-Developers.
       <p> CINDIE nace de una necesidad que sentimos por una plataforma que haga posible el acceso a material audiovisual independiente latinoamericano. El enfoque de la página está en el archivado y almacenado de proyectos de productoras o individuos pertenecientes a las artes audiovisuales y en brindarle a los usuarios la oportunidad de hacer donaciones a los artistas.</p>
        <p>  Con CINDIE nos proponemos ofrecer un amplio catálogo de largometrajes de ficción, documentales y cortometrajes realizados por artistas latinoamericanos. Nuestro objetivo a futuro es que nuestro catálogo contenga una amplia variedad de películas de todos los géneros y nacionalidades, tanto de autores consagrados como de nuevos talentos del cine independiente. </p>
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
       <Footer/>
       </> 
    )
}