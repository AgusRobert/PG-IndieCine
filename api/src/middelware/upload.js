const fileUpload = require("express-fileupload");

exports.uploadMUltimedia = fileUpload({
  tempFileDir: "./temp",
});
