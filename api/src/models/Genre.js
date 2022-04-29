const { Model, DataTypes } = require("sequelize");

class Genre extends Model{};

module.exports = (sequelize) => {
    return Genre.init({
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
        tableName:"genre",
        timestamps: false,
    });
};