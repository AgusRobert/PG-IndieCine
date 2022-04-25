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
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    persona: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    tipoDocumento: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    numeroDocumento: {
      type: DataTypes.STRING(20),
      allowNull: false, 
    },
    frenteDocumento: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    dorsoDocumento: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    terminosCondiciones: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    favoritos: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
   
  });
};
