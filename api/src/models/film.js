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
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        year: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genre: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        rating: {
            type: DataTypes.REAL,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });
};
