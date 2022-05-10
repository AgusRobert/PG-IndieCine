const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
AdminJS.registerAdapter(AdminJSSequelize);

const { User, Film, Country, Genre, Comment, Plans } = require("../db.js");

const adminJs = new AdminJS({
  databases: [
    /* con */
  ],
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      options: {
        actions: {
          enviarMail: {
            actionType: "record",
            icon: "Email",
            component: AdminJS.bundle("../myMail.jsx"),
            handler: async (req, res, context) => {
              return { record: context.record.toJSON() };
            },
          },
        },
        parent: { icon: "User" },
      },
    },
    { resource: Film, options: { parent: { icon: "Camera" } } },
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
