const { Model, DataTypes } = require("sequelize");

class Plans extends Model {}

module.exports = (sequelize) => {
  return Plans.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: "PEN",
        allowNull: false,
      },
      period:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      filmsAllowed:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "plans",
      timestamps: true,
    }
  );
};