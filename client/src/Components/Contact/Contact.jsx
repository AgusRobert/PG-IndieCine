import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Header/LOGO.png";
import s from "./contact.module.css";
import Footer from "../Footer/Footer";
import axios from "axios";
import Swal from 'sweetalert2'

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
    Swal.fire("Espere por Favor")
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
        <div className={s.content}>
          <div className={s.logo}>
            <Link to="/">
              <img src={logo} style={{ cursor: "pointer" }} alt="logo" />
            </Link>
          </div>

          <div className={[s.contactwrapper, s.animated, s.bounceInUp]}>
            <div className={s.contactform}>
              <h3>Contáctanos</h3>

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
      <div className={s.volver}>
        <Link to="/">
          <button>Gracias por contactarnos</button>
        </Link>
      </div>
    );
  }
}
