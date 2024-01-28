const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const dotenv = require("dotenv");

dotenv.config("../.env");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const throwServerError = (errorCause, error) => {
  res.status(500).send(`${errorCause}: ${error}`);
};

const uploadImage = async (imageBuffer, imageName, mimetype) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: imageBuffer,
    Key: imageName,
    ContentType: mimetype,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
  } catch (error) {
    throwServerError("Error uploading image to S3,", err);
  }
};

const deleteImage = async (imageName) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: imageName,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    throwServerError("Error deleting image from S3,", err);
  }
};

const getObjectSignedUrl = async (imageName) => {
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const command = new GetObjectCommand(params);
  const seconds = 604800;

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
    return url;
  } catch (error) {
    throwServerError("Error getting signed URL,", err);
  }
};

module.exports = { uploadImage, getObjectSignedUrl };
