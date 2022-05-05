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
  });
};
