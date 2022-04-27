const { Comment } = require("../db");

exports.getAllComents = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    res.json({ message: "Error al obtener los comentarios", error });
  }
};
exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.json(comment);
    } else {
      res.json({ message: "No se encontró el comentario" });
    }
  } catch (error) {
    res.json({ message: "Error al obtener el comentario", error });
  }
};

exports.getComentsUser = async (req, res) => {
  const comments = await Comment.findAll({
    where: { UserId: req.params.id },
  });
  if (comments) {
    return res.json(comments);
  } else {
    return res.json({ message: "No hay comentarios" });
  }
};

exports.getComentsFilm = async (req, res) => {
  const comments = await Comment.findAll({
    where: { FilmId: req.params.id },
  });
  if (comments) {
    return res.json(comments);
  } else {
    return res.json({ message: "No hay comentarios para esta pelicula" });
  }
};

exports.postComent = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.json(comment);
  } catch (error) {
    res.json({ message: "Error al crear el comentario", error });
  }
};

exports.deleteComent = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.body.id);
    if (comment) {
      await comment.destroy();
      return res.json({ message: "Comentario eliminado correctamente" });
    } else {
      return res.json({ message: "Comentario no encontrado" });
    }
  } catch (error) {
    res.json({ message: "Error al eliminar el comentario", error });
  }
};

exports.modifyComent = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.body.id);
    if (comment) {
      await comment.update(req.body);
      return res.json({ message: "Comentario actualizado correctamente" });
    } else {
      return res.json({ message: "Comentario no encontrado" });
    }
  } catch (error) {
    res.json({ message: "Error al actualizar el comentario", error });
  }
};
