module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING ,
      allowNull: true,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    pais: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favoritos: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    peliculas: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
  });
};
