import React, { useState } from "react";
import { ImageListItem } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";

function GalleryImage({ item, handleModalOpen }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const qrIconStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "blue",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.15)",
    },
  };

  const imageListStyle = {
    position: "relative",
    cursor: "pointer",
  };

  const imageStyle = {
    height: 200,
    width: 200,
  };

  return (
    <ImageListItem sx={imageListStyle}>
      <img
        src={`${item.url}`}
        alt={item.description}
        loading="lazy"
        style={imageStyle}
        onClick={() => handleModalOpen(item, "image")}
        onLoad={() => setImageLoaded(true)}
      />
      {imageLoaded && (
        <QrCode2Icon
          sx={qrIconStyle}
          onClick={() => handleModalOpen(item, "qr")}
        />
      )}
    </ImageListItem>
  );
}

export default GalleryImage;
