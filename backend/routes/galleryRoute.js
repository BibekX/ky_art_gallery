const express = require("express");
const multer = require("multer");

const galleryController = require("../controllers/galleryController");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/api/gallery", galleryController.getGallery);
router.post(
  "/api/upload",
  upload.single("file"),
  galleryController.postGallery
);

module.exports = router;
