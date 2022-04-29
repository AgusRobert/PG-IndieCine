const { Model, DataTypes } = require("sequelize");

class Country extends Model{};

module.exports = (sequelize) => {
    return Country.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    },{
        sequelize,
        tableName:"country",
        timestamps: false,
    });
};