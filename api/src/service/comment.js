const { Comment } = require("../db");

exports.getAll = async () => {
  return await Comment.findAll();
};

exports.create = async ({ body, type, commentId, userId, filmId }) => {
  return await Comment.create({
    body,
    type,
    status: "ok",
    numberReport: 0,
    UserId: userId,
    CommentId: commentId,
    FilmId: filmId,
  });
};
