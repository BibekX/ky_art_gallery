import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

function GalleryModal({
  modalOpen,
  handleModalClose,
  activeImage,
  imageOpen,
  qrOpen,
}) {
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

  const modalBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    border: "0.1rem solid #000",
    boxShadow: 24,
    p: 4,
  };

  const modalStyle = {
    "& .MuiBackdrop-root": {
      backdropFilter: "blur(0.2rem)",
    },
  };

  const downloadContainerStyle = { display: "flex", justifyContent: "center" };

  const imageModalStyle = { maxHeight: "70vh", maxWidth: "90vw" };

  const descriptionStyle = {
    color: "black",
    fontWeight: "bold",
  };

  const qrSvgStyle = { margin: "2rem" };

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      disableAutoFocus={true}
      sx={modalStyle}
    >
      <Box sx={modalBoxStyle}>
        <Box hidden={!imageOpen}>
          <img
            src={`${activeImage.url}`}
            alt={activeImage.description}
            style={imageModalStyle}
          />
          <Typography variant="body1" sx={descriptionStyle}>
            {activeImage.description}
          </Typography>
        </Box>
        <Box hidden={!qrOpen}>
          <QRCodeSVG
            id="qrCodeEl"
            size={256}
            value={activeImage.name}
            style={qrSvgStyle}
          />
          <Box sx={downloadContainerStyle}>
            <Button variant="contained" onClick={downloadQRCode}>
              Download
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default GalleryModal;
