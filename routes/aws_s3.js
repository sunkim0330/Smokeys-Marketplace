const fs = require('fs');
const AWS = require('aws-sdk');
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } = require('.env');


const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY
});

const uploadImage = async (req, res) => {

  // Create variable to hold buffer of image upload
  let imageBuffer = new Buffer.from(/* IMAGE DATA GOES HERE */);

  // Create variable to store the type of the uploaded image
  let type = /* Parse the type from the end of the image file name */;

  // PARAMS object that will be sent to S3 via upload method
  const params = {
    Bucket: BUCKET_NAME,
    Key: /* CREATE CUSTOM NAME FOR KEY */,
    Body: imageBuffer,
    ContentType: `image/${type}`
  }

  // Upload method - Should return a data object with property of .Location of where file is stored
  s3.upload(params, (err, data) => {
    if (err) throw err;
    console.log(`File uploaded successfully at ${data.Location}`);
    res.status(201).send(data.Location);
  });

}

module.exports = {
  uploadImage
}