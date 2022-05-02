const nodemailer = require("nodemailer");
const {User, Film} = require('../models/user');

// ---------------------------------- SETEADO DE MAIL -------------------------------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'indiecine2022@gmail.com', // generated ethereal user
    pass: 'dcgbihmpzpwzxnvx', // generated ethereal password
  },
});

// --------------------------------------NOVEDADES ----------------------------------------------
exports.newsletter = async (req, res) => {
    const film = await Film.findByPk(req.body.id);
    const users = await User.findAll();
   
  users.forEach(user => {
    await transporter.sendMail({
      from: '"Cindie" <indiecine2022@gmail.com>',
      to: user.email,
      subject: " Nuevo Contenido en CINDIE",
      html: `
      <div style="display:flex; flex-direction: column; justify-content: center;">
    <div>LOGO</div>
    <div>
      <h2>Hola ${user.name}</h2>
      <h3>Se agregó una nueva película a nuestro repertorio. </h3>
     </div>
     <div style="display:flex; justify-content: left;">
        <div>
      <img style="width: 350px; heigth: 500px" src=${film.poster} alt=${film.title}>
        </div>
        <div style="padding-left: 30px;">
      <h1>${film.title}</h1>
      <h3>${film.synopsis}</h3>
      <h3>${film.genres}</h3>
      <h3>${film.year}</h3>
      <h3>${film.country}</h3>
      <h3>${film.director}</h3>
      <h3>${film.mainActors}</h3>
      <h3>${film.duration}</h3>
        </div>
     </div>
     </div>
      `,
    });
  });
  res.json({message: "Messages sent"});
};

// -------------------------------------MAIL AL CREADOR DE CONTENIDO ----------------------------------------------
exports.creatorMail = async (req, res) => {
    const {id } = req.body;
     const user =  await User.findByPk(id);
 
      await transporter.sendMail({
     from: '"CINDIE" <indiecine2022@gmail.com>', // sender address
     to: user.email, // list of receivers
     subject: "CINDIE - Aprobación de Nuevo Contenido", // Subject line
     html: `
     <div style="display:flex; flex-direction: column; justify-content: center;">
 <div>LOGO</div>
 <div>
     <h1 style="color:rgb(57, 56, 56);">Hola, ${user.name} </h1>
     <p style="color:rgb(57, 56, 56);">
         Queremos informarte que tu nuevo trabajo ha sido agreado a nuestra plataforma.
     </p>
 
     <p style="color:rgb(57, 56, 56);"> 
       Ahora, todos los miembros de nuestra comunidad podrán disfrutarlo.
       </p> 
       <p style="color:rgb(57, 56, 56);"> 
      Además, para aumentar su visibilidad, periódicamente enviamos a nuestros usuarios,
      un boletín informativo con detalle los nuevos contenidos subidos a Cindie.
       </p> 
       <p style="color:rgb(57, 56, 56);"> 
       Ayudarte a difundir tus creaciones,  es una de las mayores actividades de nuestra plataforma.
       </p>
       <p style="color:rgb(57, 56, 56);">
         Gracias por contribuir al crecimiento de nuestra comunidad.
     </p>
       <p style="color:rgb(57, 56, 56);"> 
       Te invitamos a que sigas creando nuevo contenido y aportando a Cindie.
       </p>
 </div>
 </div>
     `, // html body
   })
   res.json(req.body);
 };

 exports.registerMail = async (req, res) => {
    const {id } = req.body;
        const user =  await User.findByPk(id);
        await transporter.sendMail({
            from: '"CINDIE" <indiecine2022@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Bienvenid@ a CINDE", // Subject line
            html: `
            <div style="display:flex; flex-direction: column; justify-content: center;">
            <div>LOGO</div>
            <div>
                <h1 style="color:rgb(57, 56, 56);">Hola, ${user.name} </h1>
                <h3 style="color:rgb(57, 56, 56);">
                    Ahora puedes disfrutar de todo nuestro contenido.
                </h3>
                <h3 style="color:rgb(57, 56, 56);">
                Gracias por unirte a Cindie.
                </h3>
                </div>
            `,
        });
      res.json({message: "Messages sent"});
    };

    // --------------------------------- MAIL DEL FORMULARIO DE CONTACTO --------------------------------------------

    exports.contactMail = async (req, res) => {
        const {name, email, message} = req.body;
        await transporter.sendMail({
            from: '"CINDIE" <indiecine2022@gmail.com>',
            to: "cindie.contacto@gmail.com",
            subject: "Nuevo mensaje de contacto",
            html: `
       < h1> Nuevo mensaje de contacto  </h1>
         <p>Nombre: ${name}</p>
            <p>Email: ${email}</p>
            <p>Mensaje: ${message}</p>
            `,
        });
        res.json({message: "Messages sent"});
    }

    // ---------------------------- RESPUESTA AUTOMATICA CONTACTO -----------------------------

    exports.contactMailResponse = async (req, res) => {
        const {name, email, message} = req.body;
        await transporter.sendMail({
            from: '"CINDIE" <indiecine2022@gmail.com>',
            to: "cindie.contacto@gmail.com",
            subject: "Nuevo mensaje de contacto",
            html: `
            <div style="display:flex; flex-direction: column; justify-content: center;">
            <div>LOGO</div>
            <div>
                <h1 style="color:rgb(57, 56, 56);">Hola, ${name} </h1>
                <br>
                <h3 style="color:rgb(57, 56, 56);">
                Gracias por contactarnos. Muy pronto te responderemos.
                </h3>
           </div>
            `,
        });
      res.json({message: "Messages sent"});
    };