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
  image,
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
    subcription: "Free",
    status: "registered",
    PlanId: 1,
    image,
  });
};

exports.findByEmail = async (email) => {
  return await User.findOne({ where: { email: email } });
};
