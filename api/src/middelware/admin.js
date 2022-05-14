const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");

AdminJS.registerAdapter(AdminJSSequelize);

const { User, Film, Country, Genre, Comment, Plans, filmGenre } = require("../db.js");
const {userResource} = require('../resource/userResource.js');
const {filmResource} = require('../resource/filmResource.js');

const adminJs = new AdminJS({
  databases: [
    /* con */
  ],
  rootPath: "/admin",
  dashboard: {
    component: AdminJS.bundle('../components/Dashboard/index.jsx'),
  },
  resources: [
   userResource,
    filmResource,
      
    { resource: Country, options: { parent: { icon: "Map" } } },
    { resource: Genre, options: { parent: { icon: "Star" } } },
    { resource: Comment, options: { parent: { icon: "Chat" } } },
    { resource: Plans, options: { parent: { icon: "Product" } } },
  ],
  branding: {
    logo: "https://i.ibb.co/1Q0cq5V/LOGO.png",
    favicon: "https://i.ibb.co/1Q0cq5V/LOGO.png",
    companyName: "CINDIE",
  },
});

const routerAdmin = AdminJSExpress.buildRouter(adminJs);

module.exports = {
  adminJs,
  routerAdmin,
};
