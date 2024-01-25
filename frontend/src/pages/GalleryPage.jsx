import React, { useState } from "react";
import { Container, Typography } from "@mui/material";

import UploadImage from "../components/upload/UploadImage";
import GalleryImageList from "../components/gallery/GalleryImageList";

import Image1 from "../assets/image1.avif";
import Image2 from "../assets/image2.avif";
import Image3 from "../assets/image3.avif";
import Default from "../assets/default.jpg";

function GalleryPage() {
  const [imageData, setImageData] = useState([
    {
      id: 1,
      img: Image1,
      title: "Image 1",
    },
    {
      id: 2,
      img: Image2,
      title: "Image 2",
    },
    {
      id: 3,
      img: Image3,
      title: "Image 3",
    },
    {
      id: 4,
      img: Default,
      title: "Image 4",
    },
  ]);

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        mt: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">KY & Company Art Gallery</Typography>
      <UploadImage />
      <GalleryImageList imageData={imageData} />
    </Container>
  );
}

export default GalleryPage;
