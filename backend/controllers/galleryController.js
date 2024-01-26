const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const Gallery = require("../models/Gallery");

const { uploadImage, deleteImage, getObjectSignedUrl } = require("../aws/s3");

exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ _id: -1 });
    const updatedGallery = await Promise.all(
      gallery.map(async (image) => {
        const imageUrl = await getObjectSignedUrl(image.name);
        const imageObj = image.toObject();
        imageObj.url = imageUrl;
        return imageObj;
      })
    );
    res.send(updatedGallery);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.postGallery = async (req, res) => {
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
    console.log("upload");
    const imageObj = gallery.toObject();
    imageObj.url = imageUrl;
    res.send(imageObj);
  } catch (error) {
    res.status(500).send(error);
  }
};
