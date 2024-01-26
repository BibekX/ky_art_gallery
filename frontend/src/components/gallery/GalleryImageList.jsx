import React, { useState } from "react";
import { Box, ImageList, ImageListItem, Modal } from "@mui/material";

function GalleryImageList(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
  const [activeImage, setActiveImage] = useState({ url: "", description: "" });

  return (
    <>
      <ImageList cols={3} sx={{ my: 10 }}>
        {props.imageData.map((item) => (
          <ImageListItem
            key={item.name}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <img
              src={`${item.url}`}
              alt={item.description}
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
            <img
              src={`${activeImage.url}`}
              alt={activeImage.description}
              style={{ maxHeight: "70vh", maxWidth: "90vw" }}
            />
          </Box>
        </Modal>
      </ImageList>
    </>
  );
}

export default GalleryImageList;
