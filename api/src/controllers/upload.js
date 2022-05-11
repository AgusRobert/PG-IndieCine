const userService = require("../service/user");

//configuraciones de aws
const { ENDPOINT, BUCKET_NAME } = process.env;
const AWS = require("aws-sdk");
const spaceEndpoint = new AWS.Endpoint(ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spaceEndpoint,
});

exports.uploadFile = async (req, res) => {
  try {
    const { file } = req.files;
    const { email, tipo, extra } = req.body;
    const newName = `${
      (await userService.findByEmail(email))?.id
    }-${tipo}-${extra}.${file.mimetype.split("/").pop()}`
      .split(" ")
      .join("");
    await s3
      .putObject({
        ACL: "public-read",
        Bucket: BUCKET_NAME,
        Body: file.data,
        Key: newName,
      })
      .promise();
    res.json(`https://${BUCKET_NAME}.${ENDPOINT}/${newName}`);
  } catch (err) {
    console.log("ERROR: ", err);
    res.send(err);
  }
};
