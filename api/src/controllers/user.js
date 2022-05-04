const { User, Film } = require("../db");
const { Op, where } = require("sequelize");
const bcrypt = require("bcryptjs");
const userServices = require("../service/user");

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
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },});
    if (!user) {
      // console.log("Usuario no encontrado");
      return res.json({ message: "Usuario no encontrado" });
    } else {
      await user.update(req.body);
      // console.log("Usuario actualizado correctamente");
      return res.json({ message: "Usuario actualizado correctamente" });
    }
  } catch (error) {
    // console.log("Error al actualizar el usuario");
    res.json({ message: "Error al actualizar el usuario", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      }
    });
    if (user) {
      await user.destroy();
      console.log("Usuario eliminado correctamente");
      return res.json({ message: "Usuario eliminado correctamente" });
    } else {
      console.log("Usuario no encontrado");
      return res.json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log("Ha ocurrido un error");
    res.json({ message: "Error al eliminar el usuario" });
  }
};

exports.registerUser = async (req, res) => {
  console.log("req.body", req.body);
  try {
    let user = await User.findOne({
      where: {
        email: req.body.email,
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
        let newUser = await userServices.create(req.body);
        console.log("Usuario creado con éxito");
        return res.json(newUser);
      }
    }
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    return res.json({ message: "Ha ocurrido un error", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      include: [{ model: Film }],
      where: {
        [Op.or]: [{ username: req.body.data }, { email: req.body.data }],
      },
    });
    if (!user) {
      return res.json({ message: "Username, email o password inválidos" });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.json({ message: "Username, email o password inválidos" });
    }
    res.json(user);
  } catch (error) {
    res.json({ message: "Error al obtener el usuario", error });
  }
};
