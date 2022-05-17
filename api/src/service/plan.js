const { Plans } = require("../db");

exports.getById = async (id) => {
  return await Plans.findOne({ where: { id } });
};
