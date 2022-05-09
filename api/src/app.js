
const { urlencoded } = require("express");
require("./db.js");
const app = require("express");

const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
AdminJS.registerAdapter(AdminJSSequelize);

const express = require("express");
const morgan = require("morgan");


//libreria de fileUpload
const fileUpload = require("express-fileupload");
const routes = require("./routes/index.js");
require("./db.js");
const path = require("path");

const server = express();

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "public")));

server.name = "PG-IndieCine";
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
//upload de archivos
server.use(
  fileUpload({
    tempFileDir: "./temp",
  })
);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const { User, Film, Country, Genre, Comment, Plans } = require("./db.js");
const adminJsOptions = {
    rootPath: '/admin',
   database:[],
   resources: [
       {resource: User, options: {
        actions: {enviarMail:{
            actionType: 'record',
            icon:'Email',
            component: AdminJS.bundle('./myMail.jsx'),
            handler:async(req, res, context) =>{
                return {record: context.record.toJSON(),}},}},
        parent: {icon:'User'}} },
        {resource: Film, options: {parent: {icon:'Camera'}} },
        {resource: Country, options: { parent: {icon:'Map'}} },
    {resource: Genre, options: {parent: {icon:'Star'}} },
         {resource: Comment, options: {parent: {icon:'Chat'}} },
         {resource: Plans, options: {parent: {icon:'Product'}} },
],
   branding: {
       logo: 'https://i.ibb.co/1Q0cq5V/LOGO.png',
      favicon: 'https://i.ibb.co/1Q0cq5V/LOGO.png',
       companyName: 'C I N D I E',
   }
}


const adminJs = new AdminJS(adminJsOptions);


const router = AdminJSExpress.buildRouter(adminJs);
server.use(adminJs.options.rootPath, router);

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
