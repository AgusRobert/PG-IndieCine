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
        date:{
            type: DataTypes.DATE,
            allowNull: false,
        },
       
    },{
        sequelize,
        tableName:"Comment",
        timestamps: false,
    });
};