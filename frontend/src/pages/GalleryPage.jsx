import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";

import UploadImage from "../components/upload/UploadImage";
import GalleryImageList from "../components/gallery/GalleryImageList";

function GalleryPage() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    async function getGallery() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/gallery`
        );
        setImageData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getGallery();
  }, []);

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
      <UploadImage
        addImage={(data) => {
          console.log("data", data);
          setImageData((prev) => [data, ...prev]);
        }}
      />
      <GalleryImageList imageData={imageData} />
    </Container>
  );
}

export default GalleryPage;
