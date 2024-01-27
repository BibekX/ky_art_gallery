import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";

import UploadImage from "../components/upload/UploadImage";
import GalleryImageList from "../components/gallery/GalleryImageList";
import SearchBar from "../components/search/SearchBar";

function GalleryPage() {
  const [imageData, setImageData] = useState([]);

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

  useEffect(() => {
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
          setImageData((prev) => [data, ...prev]);
        }}
      />
      <SearchBar
        searchValue={async (value) => {
          if (value === "") {
            getGallery();
            return;
          }
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND}/api/gallery/search/${value}`
            );
            setImageData(response.data);
          } catch (error) {
            console.error(error);
          }
        }}
        scanValue={async (value) => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND}/api/gallery/scan/${value}`
            );
            setImageData(response.data);
          } catch (error) {
            console.error(error);
          }
        }}
      />
      <GalleryImageList imageData={imageData} />
    </Container>
  );
}

export default GalleryPage;
