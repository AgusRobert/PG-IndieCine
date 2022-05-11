const { Comment } = require("../db");

exports.getAll = async () => {
  return await Comment.findAll();
};

exports.create = async ({ body, type, commentId, userId, filmId , username, image}) => {
  try{
    return await Comment.create({
      body,
      type,
      status: "ok",
      numberReport: 0,
      UserId: userId,
      FilmId: filmId,
      username,
      image
    });

  }
  catch(error){
    console.log("create error", error)
  }
};

exports.update = async (payload) => {
  const aux = {id: payload.id, body: payload.body}
  const comment = await Comment.findByPk(payload.id);
  if (comment) {
    const commentUpdated = await comment.update(aux);
    console.log("Comentario actualizado correctamente.");
    return commentUpdated;
  } else {
    return { message: "Comentario no encontrado" };
  }
};
