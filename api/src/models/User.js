const { Model, DataTypes } = require("sequelize");

class User extends Model{};

module.exports = (sequelize) => {
    return User.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        surname:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        userName:{
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        creator:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        people:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        typeOfDocument:{
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        numberOfDocument:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        frontDocument:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        reverseDocument:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        telephone:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        country:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        rol:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },{
        sequelize,
        tableName:"User",
        timestamps: false,
    });
};