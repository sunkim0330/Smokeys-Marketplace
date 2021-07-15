const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const uploadImage = async (req, res) => {

  /**
   * @dev Create variable to hold buffer of image upload
   */
   let imageBuffer = new Buffer.from(req.body.data.replace(/^data:image\/\w+;base64,/,""), 'base64')

  /**
   * @dev Create variable to store the type of the uploaded image
   */
   let type = req.body.data.split(';')[0].split('/')[1];

  /**
   * @dev PARAMS object that will be sent to S3 via upload method
   */
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${req.body.name}.${type}`,
    Body: imageBuffer,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  }
  console.log(params)
  /**
   * @dev Upload method - Should return a data object with property of .Location of where file is stored
   */
  s3.upload(params, (err, data) => {
    if (err) throw err;
    console.log(`File uploaded successfully at ${data.Location}`);
    res.status(201).send(data.Location);
  });

}

module.exports = {
  uploadImage
}