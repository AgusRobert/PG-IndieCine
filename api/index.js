
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const fetchCountries = require ('./utils/fetchCountries.js');
// Syncing all the models at once.
conn.sync({ force: false }).then(async() => {
 //cuando se syncquean los models tenemos una funcion que traer el array de objetos Country, si esta vacio, usamos fetchCountries para alimentar nuestra DB
  
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
// verificar finall length>1 ? ok : exe fetchC