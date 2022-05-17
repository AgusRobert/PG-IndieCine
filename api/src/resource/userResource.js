const AdminJS = require('adminjs');
const {User} = require('../db.js');


exports.userResource = {
    resource: User,
      options: {
        actions: {
          enviarMail: {
            actionType: "record",
            icon: "Email",
            component: AdminJS.bundle("../components/mailCreador.jsx"),
            handler: async (req, res, context) => {
              return { record: context.record.toJSON() };
            },
          },
          VerificarDoc: {
            actionType: "record",
            icon: "User",
            component: AdminJS.bundle("../components/verificar.jsx"),
            handler: async (req, res, context) => {
              return { record: context.record.toJSON() };
            },
          },
        },
        parent: { icon: "User" },
      properties: {
        
          status: {
              availableValues: [
                    { value: "pending", label: "pending" },
                    { value: "creator approved", label: "creator approved" },
                    { value: 'admin', label: 'admin' },
              ],
            },
        
            
    },
}
}


