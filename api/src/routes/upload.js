const router = require("express").Router();
const {
  formImage,
  uploadImage,
  postImage,
  uploadVideo,
  postVideo,
  uploadDocuments,
  postFrontDoc,
  postBackDoc,
} = require("../controllers/uploads");

//configuraciones de aws
const { ENDPOINT, BUCKET_NAME } = process.env;
const AWS = require("aws-sdk");
const spaceEndpoint = new AWS.Endpoint(ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spaceEndpoint,
});
// ----------------------------   RUTAS      --------------------------------------------

router.get("/", formImage);

router.post("/image", uploadImage, postImage);

router.post("/video", uploadVideo, postVideo);

router.post("/frontdoc", uploadDocuments, postFrontDoc);

router.post("/backdoc", uploadDocuments, postBackDoc);

router.post("/inter", async (req, res) => {
  const { file } = req.files;
  try {
    const uploadObject = await s3
      .putObject({
        ACL: "public-read",
        Bucket: BUCKET_NAME,
        Body: file.data,
        Key: file.name,
      })
      .promise();
    const urlFile = `https://${BUCKET_NAME}.${ENDPOINT}/${file.name}`;

    res.json(urlFile);
  } catch (err) {
    console.log("ERROR: ", err);
    res.send(err);
  }
});
router.get("/inters", async (req, res) => {});
router.get("/inter/:id", async (req, res) => {});
router.delete("/inter/:id", async (req, res) => {
  const { id } = req.params;
  await s3
    .deleteObject({
      Bucket: BUCKET_NAME,
      Key: "image.jpg",
    })
    .promise();
});

module.exports = router;
