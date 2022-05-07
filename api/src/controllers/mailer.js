const { transporter } = require("../service/mailing");
const { User } = require("../models/User");
const {Film} = require("../models/Film");


exports.mailing = async (req, res) => {
  let from, to, subject, html;
  from = '"Cindie" <indiecine2022@gmail.com>';
  to = req.body.email;

  switch (req.body.type) {
    case "prueba":
      subject = "Prueba de envio de correo";
      html = `
     <table style="background-color:#661c79;padding:20px;color:white; width:100%;">
     <tr style="text-align:center;">
      <h1 style="font-size:46px;font-family:Arial,sans-serif;">Hola ${req.body.name}</h1>
      </tr>
      <tr>
      <p style="font-size:26px;font-family:Arial,sans-serif;">
      Gracias por sumarte a Cindie. 
      </p>
      <p style="font-size:26px;font-family:Arial,sans-serif;">
      Ahora podras disfrutar de todo nuestro contenido.
      </p>
      </tr>
      </table>
      `;

      await enviado(from, to, subject, html);
      return res.json({ message: "Email enviado" });
    // ------------------------------------------- WELCOME USUARIO -------------------------------------------
    case "welcome":
      subject = "Bienvenid@ a Cindie";
      html = `
      <table style="background-color:#661c79;padding:20px;color:white; width:100%;">
     <tr style="text-align:center;">
      <h1 style="font-size:46px;font-family:Arial,sans-serif;">
      BIENVENIDO A CINDIE</h1>
      </tr>
      <tr>
     <h2 style="font-size:46px;font-family:Arial,sans-serif;"> Hola, ${req.body.name} </h2>
      </tr>
      <tr>
      <p style="font-size:26px;font-family:Arial,sans-serif;">
      Gracias por registrarte! Ahora formas parte del nuevo catálogo online de cine independiente latinoamericano, 
      esperamos que disfrutes nuestro contenido.
      </p>
      </tr>
      </table>
       `;

      await enviado(from, to, subject, html);
      return res.json({ message: "Email enviado" });

    // ---------------------------- RESPUESTA AUTOMATICA CONTACTO -----------------------------

    case "contactAuto":
      from = '"CINDIE" <indiecine2022@gmail.com>';
      to = req.body.email;
      subject = "Confirmación de mensaje";
      html = `
      <table style="background-color:#661c79;padding:20px;color:white; width:100%;">
      <tr style="text-align:center;">
      <h1 style="font-size:46px;font-family:Arial,sans-serif;">Hola ${req.body.name}</h1>
      </tr>
      <tr>
      <p style="font-size:26px;font-family:Arial,sans-serif;">
      Gracias por comunicarte con nosotros, tu duda será respondida a la brevedad por alguien de nuestro equipo.
      </p>
      </tr>
      </table>
        `;
      await enviado(from, to, subject, html);
      return res.json({ message: "Email enviado" });

    // ---------------------------- RESPUESTA A CONTACTO -----------------------------
    case "contact":
      subject = "Respondiendo tu consulta";
        html = `
        <table style="background-color:#661c79;padding:20px;color:white; width:100%;">
      <tr style="text-align:center;">
      <h1 style="font-size:46px;font-family:Arial,sans-serif;">Hola ${req.body.name}</h1>
      </tr>
      <tr>
      <p style="font-size:26px;font-family:Arial,sans-serif;">
      ${req.body.message}
      </p>
      </tr>
      </table>
        `;
      await enviado(from, to, subject, html);
      return res.json({ message: "Email enviado" });

    // ------------------------- MAIL DEL CONTACTO AL ADMINISTRADOR -----------------
    case "contactAdmin":
      from = '"CONTACTO CINDIE" <indiecine2022@gmail.com>';
      to = "cindiexavi@gmail.com"; // MAIL DEL ADMINISTRADOR
      subject = req.body.subject;
      html = `  
      ${req.body.name}  <br> ${req.body.phone}  <br>  ${req.body.email} <br>${req.body.message}    
          `;
      await enviado(from, to, subject, html);
      return res.json({ message: "Email enviado" });

    // ---------------------------- RESPUESTA AUTOMATICA A CREADOR -----------------------------
    case "creatorAuto":
      subject = "Solicitud de Usuario Premium";
      html = `
      <table style="background-color:#661c79;padding:20px;color:white; width:100%;">
      <tr style="text-align:center;">
      <h1 style="font-size:46px;font-family:Arial,sans-serif;">Hola ${req.body.name}</h1>
      </tr>
      <tr>
      <p style="font-size:26px;font-family:Arial,sans-serif;">
      Ya recibimos tu formulario de aplicación, en estos momentos nuestro equipo se encuentra 
      confirmando tus datos y a la brevedad te responderemos.<br>Gracias por confiar en nosotros.
      </p>
      </tr>
      </table>
        `;
      await enviado(from, to, subject, html);
      return res.json({ message: "Email enviado" });

    // ---------------------------- RESPUESTA A CREADOR -----------------------------

    case "creator":
      subject = "Ya eres Usuario Premium!";
        html = `
        <table style="background-color:#661c79;padding:20px;color:white; width:100%;">
      <tr style="text-align:center;">
      <h1 style="font-size:46px;font-family:Arial,sans-serif;">Hola ${req.body.name}</h1>
      </tr>
      <tr>
      <p style="font-size:26px;font-family:Arial,sans-serif;">
      Ya eres Usuario Premium!
      </p>
      </tr>
      <tr>
      <p style="font-size:26px;font-family:Arial,sans-serif;">
      Felicidades, tu identidad fue confirmada y fuiste aprobado como creador de contenido. 
      Ya estamos listos para recibir tu material, gracias por confiar en CINDIE.
      </p>
      </tr>
      </table>
        `;
      await enviado(from, to, subject, html);
      return res.json({ message: "Email enviado" });

    // ---------------------------- MAIL del CREADOR AL ADMINISTRDOR-----------------------------
    case "creadorAdmin":
      from = '"CINDIE" <indiecine2022@gmail.com>';
      to = "mail.deladministrador@gmail.com"; // MAIL DEL ADMINISTRADOR
      subject = "Nuevo creador de contenido";
      html = `  
       ${req.body}
          `;
      await enviado(from, to, subject, html);
      return res.json({ message: "Email enviado" });

    // ------------------------- RESPUESTA AUTOMATICA DE CONTENIDO -----------------
    case "contentAuto":
      subject = "FORMULARIO RECIBIDO";
      html = `
      <table style="background-color:#661c79;padding:20px;color:white; width:100%;">
      <tr style="text-align:center;">
      <h1 style="font-size:46px;font-family:Arial,sans-serif;">Hola ${req.body.name}</h1>
      </tr>
      <tr>
      <p style="font-size:26px;font-family:Arial,sans-serif;">
      Gracias por compartir tu material con nosotros, en breve será evaluado para
       asegurarnos de que cumple con las normas y condiciones de nuestro sitio antes de ser publicado.
      </p>
      </tr>
      </table>
                `;
      await enviado(from, to, subject, html);
      return res.json({ message: "Email enviado" });

    // ---------------------------- RESPUESTA A CONTENIDO -----------------------------
    case "content":
      subject = "PELÍCULA APROBADA";
      html = `
      <table style="background-color:#661c79;padding:20px;color:white; width:100%;">
      <tr style="text-align:center;">
      <h1 style="font-size:46px;font-family:Arial,sans-serif;">Hola ${req.body.name}</h1>
      </tr>
      <tr>
      <p style="font-size:26px;font-family:Arial,sans-serif;">
      Felicitaciones! Tu material fue aprobado por nuestro equipo y &nbsp;ya se encuentra disponible para todos los 
      seguidores de nuestra plataforma.<br>Gracias por compartir tu material con nosotros.
      </p>
      </tr>
      </table>
      `;
    await enviado(from, to, subject, html);
    return res.json({ message: "Email enviado" });

    // ---------------------------- MAIL DEL CONTENIDO AL ADMINISTRADOR -----------------------------
    case "contentAdmin":
      
      from = '"CINDIE" <indiecine2022@gmail.com>';
      to = "cindiexavi@gmail.com"; // MAIL DEL ADMINISTRADOR
      subject = "Nuevo contenido";
      html = `  
       ${req.body}
          `;
      await enviado(from, to, subject, html);
      return res.json({ message: "Email enviado" });

    // --------------------------------------NOVEDADES ----------------------------------------------
    case "news":
      const film = await Film.findAll(); //logica de filtrado se necesita fecha en modelo

      const users = await User.findAll();

      users.forEach(async (user) => {
        await transporter.sendMail({
          from: '"Cindie" <indiecine2022@gmail.com>',
          to: user.email,
          subject: " Nuevo Contenido en CINDIE",
          html: `
          <table style="background-color:#661c79;padding:20px;color:white; width:100%;">
          <tr style="text-align:center;">
           <h1 style="font-size:46px;font-family:Arial,sans-serif;">Hola ${user.username}</h1>
           </tr>
           <tr style="text-align:center;">
           <p style="font-size:26px;font-family:Arial,sans-serif;">
          Se agregó nuevo contenido a CINDIE.</p></tr>
           <tr>
          <td>
          <img style="width:250px;heigth:300px;" src=${film.poster} alt=${film.title}>
          </td>
          <td>
          <p style="font-size:26px;font-family:Arial,sans-serif;">
          ${film.title}<br>${film.synopsis} <br>${film.genres} <br>${film.year} <br>
          ${film.country} <br> ${film.director} <br> ${film.mainActors} <br> ${film.duration} <br>
          </td>
           </tr>
           </table>
      `,
        });
      });
      return res.json({ message: "Messages sent" });
};
};

async function enviado(from, to, subject, html) {
  return await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html,
  });
}