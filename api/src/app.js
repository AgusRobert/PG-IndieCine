const express = require("express");
const morgan = require("morgan");
//importacion de manejo de rutas
const routes = require("./routes/index");
//importacion de manejo de permisos
const { adminJs, routerAdmin } = require("./middelware/admin");
const { permissions } = require("./middelware/permission");
const { catching } = require("./middelware/catching");
const { uploadMUltimedia } = require("./middelware/upload");

//creacion del servidor
const server = express();
//nombre del servidor
server.name = "PG-CinDIe";
//middelware para los pasajes codificados
server.use(express.urlencoded({ extended: true }));
//middelware para la lectura de json
server.use(express.json());
//middelware util para ver los tipos de peticiones y demas al servidor
server.use(morgan("dev"));
//middelware de permisos
server.use(permissions);
//middelware para el manejo de adminJs
server.use(adminJs.options.rootPath, routerAdmin);
//middelware para subida de archivos multimedia
server.use(uploadMUltimedia);
//middelware para el manejo de rutas
server.use("/", routes);
//middelware para manejo de errores
server.use(catching);

module.exports = server;
//---------------------------------------------------------------------------

/* const { urlencoded } = require("express");
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

const con = require("./db.js").connect;

const adminJs = new AdminJS({
  databases: [con],
  rootPath: "/admin",
});
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
 */

/* const { urlencoded } = require("express");
require("./db.js");
const app = require("express");
//ADMIN JS
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
AdminJS.registerAdapter(AdminJSSequelize);

const express = require("express");
const morgan = require('morgan');
const routes = require('./routes/index.js');
require("./db.js");

const path = require('path');
const server = express();

//ADMIN JS

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use(express.static(path.join(__dirname, 'public')));

server.name = "PG-IndieCine";
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const con = require('./db.js').connect;

const adminJs = new AdminJS({
  databases: [con],
  rootPath: '/admin',
  branding: {
    logo: 'https://i.ibb.co/1Q0cq5V/LOGO.png',
    favicon: 'https://i.ibb.co/1Q0cq5V/LOGO.png',
    companyName: 'CINDIE'
  }
})
const router = AdminJSExpress.buildRouter(adminJs)
  server.use(adminJs.options.rootPath, router)
  
  
  server.use("/", routes);
  
  server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });
  
  module.exports = server; */
//-----------------------------------------------

//-----------------------------------------------------------------------------------------
// const { urlencoded } = require("express");
// require("./db.js");
// const express = require("express");
// const server = express();

// //ADMIN JS
// const AdminJS = require("adminjs");
// const AdminJSExpress = require("@adminjs/express");
// const AdminJSSequelize = require("@adminjs/sequelize");
// AdminJS.registerAdapter(AdminJSSequelize);

// // const express = require("express");
// const morgan = require("morgan");
// //upload de archivos
// server.use(
//   fileUpload({
//     tempFileDir: "./temp",
//   })
// );
// const routes = require("./routes/index.js");
// require("./db.js");

// const path = require("path");

// //ADMIN JS

// server.set("views", path.join(__dirname, "views"));
// server.set("view engine", "ejs");
// server.use(express.static(path.join(__dirname, "public")));

// server.name = "PG-IndieCine";
// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));
// server.use(morgan("dev"));

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

// // const con = require('./db.js').connect;
// const { User, Film, Country, Genre, Comment, Plans } = require("./db.js");
// const { catching } = require("./middleward/catching");
// const fileUpload = require("express-fileupload");
// const adminJs = new AdminJS({
//   databases: [
//     /* con */
//   ],
//   rootPath: "/admin",
//   resources: [
//     {
//       resource: User,
//       options: {
//         actions: {
//           enviarMail: {
//             actionType: "record",
//             icon: "Email",
//             component: AdminJS.bundle("./myMail.jsx"),
//             handler: async (req, res, context) => {
//               return { record: context.record.toJSON() };
//             },
//           },
//         },
//         parent: { icon: "User" },
//       },
//     },
//     { resource: Film, options: { parent: { icon: "Camera" } } },
//     { resource: Country, options: { parent: { icon: "Map" } } },
//     { resource: Genre, options: { parent: { icon: "Star" } } },
//     { resource: Comment, options: { parent: { icon: "Chat" } } },
//     { resource: Plans, options: { parent: { icon: "Product" } } },
//   ],
//   branding: {
//     logo: "https://i.ibb.co/1Q0cq5V/LOGO.png",
//     favicon: "https://i.ibb.co/1Q0cq5V/LOGO.png",
//     companyName: "CINDIE",
//   },
// });
// const router = AdminJSExpress.buildRouter(adminJs);
// server.use(adminJs.options.rootPath, router);

// server.use("/", routes);

// server.use((err, req, res, next) => {
//   const status = err.status || 500;
//   const message = err.message || err;
//   console.error(err);
//   res.status(status).send(message);
// });

// module.exports = server;
