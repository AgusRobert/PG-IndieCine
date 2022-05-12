const { SERVER_FRONT } = require("../paths/path");
exports.permissions = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", SERVER_FRONT); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
};
