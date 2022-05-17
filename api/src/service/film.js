const { Film } = require("../db");
const userService = require("./user");

exports.filmsOfUser = async (email, maper = true, status = "approved") => {
  const user = await userService.findByEmail(email);
  const films = await Film.findAll({
    where: { UserId: user.id, status },
  });
  if (maper) return films.map((f) => f.dataValues);
  return films;
};

exports.update = async (id, status = "hidden") => {
  const film = await Film.findByPk(id);
  if (film?.status === "approved") {
    return await film.update({
      status,
    });
  }
  return { msg: "pelicula no encontrada" };
};
