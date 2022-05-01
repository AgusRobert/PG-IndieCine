require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pgindiecine`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let capsEntries = Object.entries(sequelize.models)?.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Film, Country, Genre, Comment } = sequelize.models;

User.belongsToMany(Film,{
  through: "Favorito",
  timestamps: false,
});
Film.belongsToMany(User,{
  through: "Favorito",
  timestamps: false,
});

Country.hasMany(Film);
Film.belongsTo(Country);

Film.belongsToMany(Genre,{
  through: "FilmGenre",
  timestamps: false,
});
Genre.belongsToMany(Film,{
  through: "FilmGenre",
  timestamps: false,
});

User.hasMany(Film);
Film.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Film.hasMany(Comment);
Comment.belongsTo(Film);




module.exports = {
    ...sequelize.models,
    connect: sequelize,
}