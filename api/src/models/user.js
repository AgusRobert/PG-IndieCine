module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    creador: {
      type: DataTypes.BOOLEAN,
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
    persona: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tipoDocumento: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    numeroDocumento: {
      type: DataTypes.STRING(20),
      allowNull: true, 
    },
    frenteDocumento: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    dorsoDocumento: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    terminosCondiciones: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    pais: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    role: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
   
  });
};
