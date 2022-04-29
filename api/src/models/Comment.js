const { Model, DataTypes } = require("sequelize");

class Comment extends Model{};

module.exports = (sequelize) => {
    return Comment.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comment:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,
        tableName:"comment",
        timestamps: true,
    });
};