import React, { useState } from "react";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { QRCodeSVG } from "qrcode.react";

function GalleryImageList(props) {
  const modalBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [imageLoaded, setImageLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState({
    name: "",
    description: "",
    url: "",
  });
  const [imageOpen, setImageOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const handleOpen = ({ name, description, url }, dataName) => {
    setActiveImage({ name, description, url });
    setOpen(true);
    console.log("dataName", dataName);
    dataName === "image" ? setImageOpen(true) : setQrOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageOpen(false);
    setQrOpen(false);
  };

  function downloadQRCode() {
    const svg = document.getElementById("qrCodeEl");
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${activeImage.name}.svg`;
    link.href = url;
    link.click();
  }

  return (
    <>
      <ImageList cols={3} sx={{ my: 3 }}>
        {props.imageData.map((item) => (
          <ImageListItem
            key={item.name}
            sx={{ position: "relative", cursor: "pointer" }}
          >
            <img
              src={`${item.url}`}
              alt={item.description}
              loading="lazy"
              style={{
                height: 200,
                width: 200,
              }}
              onClick={() => handleOpen(item, "image")}
              onLoad={() => setImageLoaded(true)}
            />
            {imageLoaded && (
              <QrCode2Icon
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "blue",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.15)",
                  },
                }}
                onClick={() => handleOpen(item, "qr")}
              />
            )}
          </ImageListItem>
        ))}
        <Modal
          open={open}
          onClose={handleClose}
          disableAutoFocus={true}
          sx={{
            "& .MuiBackdrop-root": {
              backdropFilter: "blur(3px)",
            },
          }}
        >
          <Box sx={modalBoxStyle}>
            <Box hidden={!imageOpen}>
              <img
                src={`${activeImage.url}`}
                alt={activeImage.description}
                style={{ maxHeight: "70vh", maxWidth: "90vw" }}
              />
              <Typography variant="body1">{activeImage.description}</Typography>
            </Box>
            <Box hidden={!qrOpen}>
              <QRCodeSVG
                id="qrCodeEl"
                size={256}
                value={activeImage.name}
                style={{ margin: "2rem" }}
              />
              <br />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" onClick={downloadQRCode}>
                  Download
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </ImageList>
    </>
  );
}

export default GalleryImageList;
