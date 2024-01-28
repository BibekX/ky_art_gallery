import React, { useState } from "react";
import { Box, ImageList } from "@mui/material";

import GalleryImage from "./GalleryImage";
import GalleryModal from "./GalleryModal";

function GalleryImageList({ imageData }) {
  const [activeImage, setActiveImage] = useState({
    name: "",
    description: "",
    url: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const handleModalOpen = ({ name, description, url }, dataName) => {
    setActiveImage({ name, description, url });
    setModalOpen(true);
    dataName === "image" ? setImageOpen(true) : setQrOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setImageOpen(false);
    setQrOpen(false);
  };

  const imageListStyle = {
    my: 3,
  };

  return (
    <Box>
      <ImageList cols={3} sx={imageListStyle}>
        {imageData.map((item) => (
          <Box key={item.name}>
            <GalleryImage item={item} handleModalOpen={handleModalOpen} />
          </Box>
        ))}
        <GalleryModal
          activeImage={activeImage}
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          imageOpen={imageOpen}
          qrOpen={qrOpen}
        />
      </ImageList>
    </Box>
  );
}

export default GalleryImageList;
