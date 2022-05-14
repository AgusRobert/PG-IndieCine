const AdminJS = require('adminjs');
const {Film} = require('../db.js');


exports.filmResource = {
    resource: Film,
      options: {
        actions: {
          enviarMail: {
            actionType: "record",
            icon: "Email",
            component: AdminJS.bundle("../components/mailFilm.jsx"),
            handler: async (req, res, context) => {
              return { record: context.record.toJSON() };
            },
          },
        },
        parent: { icon: "Camera" },
      properties: {
          status: {
              availableValues: [
                    { value: "pencreatording", label: "pending" },
                    { value: "approved", label: "approved" },
              ],
            },
      },
    },
};


