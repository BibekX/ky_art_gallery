import React, { useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";

function GalleryImageList(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (item) => {
    setActiveImage(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [activeImage, setActiveImage] = useState({ img: "", title: "" });

  return (
    <>
      <ImageList cols={3} sx={{ my: 10 }}>
        {props.imageData.map((item) => (
          <ImageListItem
            key={item.img}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <img
              src={`${item.img}`}
              alt={item.title}
              loading="lazy"
              style={{
                height: 200,
                width: 200,
              }}
              onClick={() => handleOpen(item)}
            />
          </ImageListItem>
        ))}
        <Modal open={open} onClose={handleClose} disableAutoFocus={true}>
          <Box sx={style}>
            <img src={`${activeImage.img}`} alt={activeImage.title} />
          </Box>
        </Modal>
      </ImageList>
    </>
  );
}

export default GalleryImageList;
