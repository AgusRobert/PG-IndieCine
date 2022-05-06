const { User } = require("../db");

exports.create = async ({
  name,
  surname,
  username,
  password,
  creator,
  email,
  people,
  typeOfDocument,
  numberOfDocument,
  frontDocument,
  backDocument,
  telephone,
  country,
  picture
}) => {
  return await User.create({
    name,
    surname,
    username,
    password,
    creator,
    email,
    people,
    typeOfDocument,
    numberOfDocument,
    frontDocument,
    backDocument,
    telephone,
    country,
    rol: "user",
    subcription: "common",
    status: "registered",
    picture
  });
};

exports.getById = async (id) => {
  return await User.findOne({
    where: {
      id: id
    }
  })
}
