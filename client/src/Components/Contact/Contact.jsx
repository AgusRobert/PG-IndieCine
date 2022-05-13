import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Header/LOGO.png";
import s from "./contact.module.css";
import Footer from "../Footer/Footer";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { AppBar } from "@mui/material";
import { styled } from '@mui/material/styles';
import { borderRadius, Box, display } from "@mui/system";
import Swal from 'sweetalert2'
import { ButtonStyle } from "../StyleMUI/StyleMUI";
import { Container } from "@mui/material";

const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center"
});

const BoxS = styled(Box)({
  paddingTop: 200
});
const ContainerR = styled(Container)({
  paddingTop: 300
});
const BoxR = styled(Box)({
  padding:100,
  backgroundColor:"#424242",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  borderRadius:20
});
export default function Contact() {
  const [redir, setRedir] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      type: "contactAuto",
      name: e.target.fullname.value,
      phone: e.target.phone.value,
      subject: e.target.affair.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
    /* alert("Espere por Favor"); */
    Swal.fire({
      title: 'Espere un momento por favor.',
      width: 600,
      timer: 5000,
      timerProgressBar: true,
      padding: '1em',
      icon: 'warning',
      color: '#716add',
      background: 'black',
      backdrop: `
        rgba(0,0,123,0.2)0  `,
      confirmButtonText: 'Entiendo',
    })
    await axios.post("http://localhost:3001/mail", data);

    data.type = "contactAdmin";
    await axios.post("http://localhost:3001/mail", data);
    e.target.reset();
    e.target.boton.disable = true;
    setRedir(true);
  }
  if (!redir) {
    return (
      <>
        <AppStyle>
          <Link to={'/'}><img src={logo} alt="img not found" /></Link>
        </AppStyle>
        <BoxS></BoxS>
        <div className={s.content}>
          <div className={[s.contactwrapper, s.animated, s.bounceInUp]}>
            <div className={s.contactform}>
              <h3>CONTÁCTANOS</h3>

              <form onSubmit={handleSubmit}>
                <p>
                  <label>Nombre y Apellido</label>
                  <input type="text" name="fullname" required />
                </p>
                <p>
                  <label>Email </label>
                  <input type="email" name="email" required />
                </p>
                <p>
                  <label>Teléfono</label>
                  <input type="tel" name="phone" />
                </p>
                <p>
                  <label>Asunto</label>
                  <input type="text" name="affair" required />
                </p>
                <p className={s.block}>
                  <label>Mensaje</label>
                  <textarea name="message" rows="3" required></textarea>
                </p>
                <p className={s.block}>
                  <button type="submit" name="boton">
                    Enviar
                  </button>
                </p>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <ContainerR>
      <BoxR>
        <Link to="/">
          <ButtonStyle>Gracias por contactarnos</ButtonStyle>
        </Link>
      </BoxR>
      </ContainerR>
    );
  }
}
