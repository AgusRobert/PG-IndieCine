const nodemailer = require("nodemailer");

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
  const {name, email, subject, message } = req.body;
     await transporter.sendMail({
    from: '"Indie-Cine" <indiecine2022@gmail.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: `
    <h1>Hi ${name}</h1>
    <h3>${message}</h3>`, // html body
  })
  res.json(req.body);
};



  