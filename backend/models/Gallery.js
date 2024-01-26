const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  photos: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
  },
});

module.exports = mongoose.model("galleries", gallerySchema);
