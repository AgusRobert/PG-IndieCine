const nodemailer = require("nodemailer");
const {User} = require('../models/user');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'indiecine2022@gmail.com', // generated ethereal user
    pass: 'dcgbihmpzpwzxnvx', // generated ethereal password
  },
});

exports.sendMail = async (req, res) => {
   const {id } = req.body;
  //const user =  await User.findByPk(id);

     await transporter.sendMail({
    from: '"Indie-Cine" <indiecine2022@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Nuevo Contenido", // Subject line
    html: `
    <div style="display:flex; flex-direction: column; justify-content: center;">
<div>LOGO</div>
<div>
    <h1 style="color:rgb(57, 56, 56);">Hola, ${req.body.name} </h1>
    <p style="color:rgb(57, 56, 56);">
        Queremos informarte que tu nuevo trabajo ha sido agreado a nuestra plataforma.
    </p>

    <p style="color:rgb(57, 56, 56);"> 
      Ahora, todos los integrantes de nuestra plataforma podrán disfrutar de tu nuevo trabajo, 
      ya que estaremos enviando una gacetilla informativa de tu film a todos ell@s.
      </p> 
      <p style="color:rgb(57, 56, 56);"> 
      Ayudarte a difundir tus creaciones,  es una de las mayores actividades de nuestra plataforma.
      </p>
      <p style="color:rgb(57, 56, 56);">
        Gracias por contribuir al crecimiento de nuestra comunidad.
    </p>
      <p style="color:rgb(57, 56, 56);"> 
      Te invitamos a que sigas creando nuevo contenido y aportando a Indie-Cine.
      </p>
    
</div>
</div>
    `, // html body
  })
  res.json(req.body);
  
};



  