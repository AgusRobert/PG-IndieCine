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

const { uploadFile } = require("../controllers/upload");

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

router.post("/inter", uploadFile);

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
