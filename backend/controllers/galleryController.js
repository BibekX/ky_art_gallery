const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const Gallery = require("../models/Gallery");

const { uploadImage, getObjectSignedUrl } = require("../aws/s3");

const getGalleryWithSignedUrl = async (gallery) => {
  return await Promise.all(
    gallery.map(async (image) => {
      const imageUrl = await getObjectSignedUrl(image.name);
      const imageObj = image.toObject();
      imageObj.url = imageUrl;
      return imageObj;
    })
  );
};

const throwServerError = (errorCause, error) => {
  res.status(500).send(`${errorCause}: ${error}`);
};

const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ _id: -1 });
    const updatedGallery = await getGalleryWithSignedUrl(gallery);
    res.send(updatedGallery);
  } catch (error) {
    throwServerError("Error retrieving gallery", error);
  }
};

const getSearchGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({
      description: { $regex: req.params.searchValue, $options: "i" },
    }).sort({ _id: -1 });
    const updatedGallery = await getGalleryWithSignedUrl(gallery);
    res.send(updatedGallery);
  } catch (error) {
    throwServerError("Error retrieving searched data", error);
  }
};

const getScanGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({
      name: req.params.scanValue,
    }).sort({ _id: -1 });
    const updatedGallery = await getGalleryWithSignedUrl(gallery);
    res.send(updatedGallery);
  } catch (error) {
    throwServerError("Error retrieving scanned data", error);
  }
};

const postGallery = async (req, res) => {
  try {
    const imageName = uuidv4();
    const { buffer, mimetype } = req.file;
    const { description } = req.body;
    await uploadImage(buffer, imageName, mimetype);

    const { width, height } = await sharp(buffer).metadata();
    const gallery = new Gallery({
      name: imageName,
      description,
      photos: {
        height,
        width,
      },
    });
    await gallery.save();
    const imageUrl = await getObjectSignedUrl(gallery.name);
    const imageObj = gallery.toObject();
    imageObj.url = imageUrl;
    res.send(imageObj);
  } catch (error) {
    throwServerError("Error uploading image", error);
  }
};

module.exports = {
  getGallery,
  getSearchGallery,
  getScanGallery,
  postGallery,
};
