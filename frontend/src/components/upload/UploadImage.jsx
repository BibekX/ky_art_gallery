import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
  IconButton,
  Link,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";

import DefaultImage from "/public/default.jpg";

function UploadImage({ addImage }) {
  const [previewImage, setPreviewImage] = useState(DefaultImage);
  const [imageData, setImageData] = useState({ img: null, description: "" });
  const [uploadActive, setUploadActive] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const inputRef = useRef(null);

  const handleActiveImage = () => {
    setUploadActive(true);
  };

  const handleInactiveImage = () => {
    setPreviewImage(DefaultImage);
    setImageData({ img: null, description: "" });
    setUploadActive(false);
  };

  const handleBrowseImage = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const maxSize = 5242880;

      if (file.size >= maxSize) {
        setSnackbarMessage(
          "File is too large, please select a file smaller than 5MB."
        );
        setSnackbarOpen(true);
        return;
      }
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImageData((prev) => ({ ...prev, img: event.target.files[0] }));
    }
  };

  const handleDescriptionChange = (event) => {
    setImageData((prev) => ({ ...prev, description: event.target.value }));
  };

  const handleUploadImage = (event) => {
    event.preventDefault();
    if (imageData.img === null) {
      setSnackbarMessage("Please select an image to upload.");
      setSnackbarOpen(true);
      return;
    }
    if (imageData.description === "") {
      setSnackbarMessage("Please enter a description for the image.");
      setSnackbarOpen(true);
      return;
    }

    const data = new FormData();
    data.append("file", imageData.img);
    data.append("description", imageData.description);

    axios
      .post(`${import.meta.env.VITE_BACKEND_SERVER}/api/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        addImage(response.data);
        handleInactiveImage();
      });
  };

  const uploadContainerStyle = {
    marginTop: 4,
  };

  const uploadBoxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const buttonStyle = { mx: 1 };

  const imageDescriptionStyle = { my: 3 };

  const previewImageStyle = {
    width: 350,
    height: 200,
  };

  return (
    <Container component="main" maxWidth="sm" sx={uploadContainerStyle}>
      <Box hidden={uploadActive}>
        <Button variant="contained" onClick={handleActiveImage}>
          Upload
        </Button>
      </Box>
      <Box hidden={!uploadActive}>
        <Box sx={uploadBoxStyle}>
          <input
            type="file"
            accept="image/png"
            name="img"
            ref={inputRef}
            onChange={handleImageChange}
            hidden
          />
          <IconButton onClick={handleBrowseImage}>
            <CardMedia
              component="img"
              sx={previewImageStyle}
              image={previewImage}
            />
          </IconButton>
          <Link href="#" underline="none" onClick={handleBrowseImage}>
            Add Photo
          </Link>
          <TextField
            label="Image Description"
            variant="outlined"
            name="description"
            sx={imageDescriptionStyle}
            required
            fullWidth
            value={imageData.description}
            onChange={handleDescriptionChange}
          />
          <Box>
            <Button
              variant="contained"
              onClick={handleUploadImage}
              sx={buttonStyle}
            >
              Upload Image
            </Button>
            <Button
              variant="outlined"
              onClick={handleInactiveImage}
              sx={buttonStyle}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default UploadImage;
