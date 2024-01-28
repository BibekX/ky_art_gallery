import React, { useEffect, useState } from "react";
import { Container, Snackbar, Typography } from "@mui/material";
import axios from "axios";

import UploadImage from "../components/upload/UploadImage";
import GalleryImageList from "../components/gallery/GalleryImageList";
import SearchBar from "../components/search/SearchBar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_SERVER;

function GalleryPage() {
  const [imageData, setImageData] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  useEffect(() => {
    fetchData(`${BACKEND_URL}/api/gallery`);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await axios(url);
      setImageData(response.data);
    } catch (error) {
      setSnackbarMessage(error.message);
    }
  };

  const containerStyle = {
    mt: 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  return (
    <Container maxWidth="lg" sx={containerStyle}>
      <Typography variant="h3">KY & Company Art Gallery</Typography>
      <UploadImage
        addImage={(data) => {
          setImageData((prev) => [data, ...prev]);
        }}
      />
      <SearchBar
        searchValue={async (value) => {
          if (value === "") {
            fetchData(`${BACKEND_URL}/api/gallery`);
            return;
          }
          fetchData(`${BACKEND_URL}/api/gallery/search/${value}`);
        }}
        scanValue={async (value) => {
          fetchData(`${BACKEND_URL}/api/gallery/scan/${value}`);
        }}
      />
      <GalleryImageList imageData={imageData} />
      {snackbarMessage && (
        <Snackbar
          open={!!snackbarMessage}
          autoHideDuration={6000}
          onClose={() => setSnackbarMessage(null)}
          message={snackbarMessage}
        />
      )}
    </Container>
  );
}

export default GalleryPage;
