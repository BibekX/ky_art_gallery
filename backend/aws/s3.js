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

const uploadImage = async (imageBuffer, imageName, mimetype) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: imageBuffer,
    Key: imageName,
    ContentType: mimetype,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));
};

const deleteImage = async (imageName) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: imageName,
  };

  await s3Client.send(new DeleteObjectCommand(deleteParams));
};

const getObjectSignedUrl = async (imageName) => {
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const command = new GetObjectCommand(params);
  const seconds = 3600;
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url;
};

module.exports = { uploadImage, deleteImage, getObjectSignedUrl };
