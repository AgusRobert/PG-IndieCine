const { User, Film } = require("../db");
const {Op} = require("sequelize");
const bcrypt = require("bcryptjs");

exports.allUsers = async (req, res) => {
  try {
    let users = await User.findAll({ include: [{ model: Film }] });
    res.json(users);
  } catch (error) {
    res.json({ message: "Error al obtener los usuarios", error });
  }
};

exports.getUser = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id, {
      include: [{ model: Film }],
    });

    if (user) {
      res.json(user);
    } else {
      res.json({ message: "No se encontró el usuario" });
    }
  } catch (error) {
    res.json({ message: "Error al obtener el usuario", error });
  }
};

exports.putUser = async (req, res) => {
  try {
    let user = await User.findByPk(req.body.id);
    if (!user) {
      return res.json({ message: "Usuario no encontrado" });
    } else {
      await user.update(req.body);
      return res.json({ message: "Usuario actualizado correctamente" });
    }
  } catch (error) {
    res.json({ message: "Error al actualizar el usuario", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.id);
    if (user) {
      await user.destroy();
      return res.json({ message: "Usuario eliminado correctamente" });
    } else {
      return res.json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.json({ message: "Error al eliminar el usuario" });
  }
};

exports.registerUser = async (req, res) => {
  console.log("req.body", req.body);
  try {
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (req.body.creator) {
      //si 'creator' es true
      if (!user) {
        console.log("Usuario no encontrado");
        return res.json({ message: "Usuario no encontrado" });
      } else {
        await user.update({
          ...user,
          ...req.body,
        });
        console.log("Usuario actualizado correctamente");
        return res.json({ message: "Usuario actualizado correctamente" });
      }
    } else {
      //si 'creator' es false
      if (user) {
        console.log("El usuario ya existe.");
        return res.json({ message: "El usuario ya existe" });
      } else {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        let newUser = await User.create(req.body);
        console.log("Usuario creado con éxito");
        return res.json(newUser);
      }
    }
  } catch (error) {
    console.log("Ha ocurrido un error");
    return res.json({ message: "Ha ocurrido un error", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      include: [ { model: Film}],
      where: {
        [Op.or]: [ { username: req.body.data}, { email: req.body.data} ],
      },
    });
    if (!user) {
      return res.json({ message: "Username, email o password inválidos" });
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password );
    if (!passwordIsValid) {
      return res.json({ message: "Username, email o password inválidos" });
    }
    res.json(user);
  } catch (error) {
    res.json({ message: "Error al obtener el usuario", error });
  }
};
