const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty:{
      type: DataTypes.INTEGER,
      validate:{
        isInt: true,
        min:1,
        max:5
      } },
    duration:{ type: DataTypes.INTEGER,
      validate:{
        isInt: true,
        min:1,
        max:72
      } },
    season:{ type: DataTypes.ENUM(
     "Summer", "Fall", "Winter","Spring"
    ),
    allowNull: false,}
  });
};
// ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)