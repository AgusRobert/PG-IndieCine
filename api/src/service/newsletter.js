const nodemailer = require("nodemailer");
const {User, Film} = require('../models/user');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'indiecine2022@gmail.com', // generated ethereal user
    pass: 'dcgbihmpzpwzxnvx', // generated ethereal password
  },
});

exports.newsletter = async (req, res) => {
    const film = await Film.findByPk(req.body.id);
    const users = await User.findAll();
   
  users.forEach(user => {
    await transporter.sendMail({
      from: '"Indie-Cine" <indiecine2022@gmail.com>',
      to: user.email,
      subject: " Indie-Cine - Nueva Pelicula",
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