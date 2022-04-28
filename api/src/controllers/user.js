const { User, Film } = require("../db");
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
  console.log(req.body);
  try {
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (user) {
      return res.json({ message: "El usuario ya existe" });
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      let newUser = await User.create(req.body);
      return res.json(newUser);
    }
  } catch (error) {
    return res.json({ message: "Ha ocurrido un error", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      include: [ { model: Film}],
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.json({ message: "Invalid email or password" });
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password );
    if (!passwordIsValid) {
      return res.json({ message: "Invalid email or password" });
    }
    res.json(user);
  } catch (error) {
    res.json({ message: "Error al obtener el usuario", error });
  }
};
