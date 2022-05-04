const { Model, DataTypes } = require("sequelize");

class Film extends Model {}

module.exports = (sequelize) => {
  return Film.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      poster: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1800,
          max: (new Date())?.getFullYear(),
        },
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mainActors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      director: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      associateProducer: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      rating: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "film",
      timestamps: true,
    }
  );
};
