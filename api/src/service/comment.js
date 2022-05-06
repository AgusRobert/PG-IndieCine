const { Comment, User } = require("../db");
const userService = require("./user");

exports.getAll = async () => {
  return await Comment.findAll();
};

exports.create = async ({ body, type, commentId, userEmail, filmId }) => {
  const user = await User.findOne({
    where: {
      email: userEmail
    }
  })
  return await Comment.create({
    body,
    type,
    status: "ok",
    numberReport: 0,
    UserId: user?.id,
    CommentId: commentId,
    FilmId: filmId,
    picture: user?.picture
  });
};

exports.addUsernames = async (comments) => {
   
  return await  Promise.all(comments.map(async (data) => {
    
    return await addUsername(data, data.UserId)
   }))

  
}

const addUsername = async (comment, id) => {
  const user = await userService.getById(id)
  return {
    ...comment,
    username: user.username,
    picture: user.picture
  }
}