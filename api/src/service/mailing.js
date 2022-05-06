const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'indiecine2022@gmail.com', // generated ethereal user
    pass: 'dcgbihmpzpwzxnvx', // generated ethereal password
  },
});