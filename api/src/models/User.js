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
            allowNull: true,
        },
        surname:{
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        username:{
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
            allowNull: true,
        },
        typeOfDocument:{
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        numberOfDocument:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        frontDocument:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        reverseDocument:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        telephone:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        country:{
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        rol:{
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    },{
        sequelize,
        tableName:"user",
        timestamps: false,
    });
};