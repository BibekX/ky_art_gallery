import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
  IconButton,
  Link,
  TextField,
} from "@mui/material";
import axios from "axios";

import DefaultImage from "../../assets/default.jpg";

function UploadImage(props) {
  const [previewImage, setPreviewImage] = useState(DefaultImage);
  const [imageData, setImageData] = useState({ img: null, description: "" });
  const [uploadActive, setUploadActive] = useState(false);
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
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size >= maxSize) {
        alert("File is too large, please select a file smaller than 5MB.");
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
      alert("Please select an image to upload.");
      return;
    }
    if (imageData.description === "") {
      alert("Please enter a description for the image.");
      return;
    }

    const data = new FormData();
    data.append("file", imageData.img);
    data.append("description", imageData.description);

    axios
      .post(`${import.meta.env.VITE_BACKEND}/api/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        props.addImage(response.data);
        handleInactiveImage();
      });
  };

  return (
    // Container
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        marginTop: 4,
      }}
    >
      {/* Upload Button */}
      <Box hidden={uploadActive}>
        <Button variant="contained" onClick={handleActiveImage}>
          Upload
        </Button>
      </Box>
      {/* Upload Button Container */}
      <Box hidden={!uploadActive}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Image File Input */}
          <input
            type="file"
            accept="image/png"
            name="img"
            ref={inputRef}
            onChange={handleImageChange}
            hidden
          />
          {/* Image Preview */}
          <IconButton onClick={handleBrowseImage}>
            <CardMedia
              component="img"
              sx={{
                width: 350,
                height: 200,
              }}
              image={previewImage}
            />
          </IconButton>
          <Link href="#" underline="none" onClick={handleBrowseImage}>
            Add Photo
          </Link>
          {/* Image Description */}
          <TextField
            label="Image Description"
            variant="outlined"
            name="description"
            sx={{ my: 3 }}
            required
            fullWidth
            value={imageData.description}
            onChange={handleDescriptionChange}
          />
          {/* Upload Button */}
          <Box>
            <Button variant="contained" onClick={handleUploadImage}>
              Upload Image
            </Button>
            <Button variant="outlined" onClick={handleInactiveImage}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default UploadImage;
