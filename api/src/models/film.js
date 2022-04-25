module.exports =(sequelize, DataTypes) => {
    return sequelize.define('film', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: false
        },
        synopsis: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        year: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        director:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        genres: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        mainActors:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false,
        },  
        movieUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        associateProducer:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
};
