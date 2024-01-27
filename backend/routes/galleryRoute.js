const express = require("express");
const multer = require("multer");

const galleryController = require("../controllers/galleryController");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/gallery", galleryController.getGallery);
router.get("/gallery/search/:searchValue", galleryController.getSearchGallery);
router.get("/gallery/scan/:scanValue", galleryController.getScanGallery);
router.post("/upload", upload.single("file"), galleryController.postGallery);

module.exports = router;
