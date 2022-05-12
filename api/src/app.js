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
