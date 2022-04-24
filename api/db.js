const Sequelize = require('sequelize');

const FilmModel = require('./models/film');
const UserModel = require('./models/user');

const sequelize = new Sequelize('Peliculas', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

const Film = FilmModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync({force: false})
    .then(() => {
        console.log('Database & tables created!');
    });

module.exports = {
    Film,
    User
};