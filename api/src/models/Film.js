const { Model, DataTypes } = require("sequelize");

class Film extends Model{};

module.exports = (sequelize) => {
    return Film.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        genres:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        poster:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        synopsis:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        year:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        director:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        mainActors:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        country:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        url:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        associateProducer:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        rating:{
            type: DataTypes.REAL,
            allowNull: false,
        },
    },{
        sequelize,
        tableName:"Film",
        timestamps: false,
    });
};