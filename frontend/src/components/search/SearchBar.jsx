import React, { useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { QrScanner } from "@yudiel/react-qr-scanner";

function SearchBar({ searchValue, scanValue }) {
  const [search, setSearch] = useState("");
  const [scannerActive, setScannerActive] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClearResult = () => {
    setShowResult(false);
    setSearch("");
    searchValue("");
  };

  const searchContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const iconHoverStyle = {
    cursor: "pointer",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.15)",
    },
  };

  const searchInputStyle = {
    width: "39rem",
    maxWidth: "100%",
    background: "#303030",
    my: 5,
  };

  const buttonMarginStyle = {
    my: 3,
  };

  return (
    <Box>
      <Box sx={searchContainerStyle}>
        <TextField
          id="outlined-search"
          placeholder="Search image with description"
          type="search"
          onChange={handleSearchChange}
          value={search}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              searchValue(search);
              setShowResult(true);
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={iconHoverStyle}
                  onClick={() => {
                    searchValue(search);
                    setShowResult(true);
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <QrCodeScannerIcon
                  sx={iconHoverStyle}
                  onClick={() => setScannerActive(true)}
                />
              </InputAdornment>
            ),
          }}
          sx={searchInputStyle}
        />
        {showResult && (
          <Button
            variant="outlined"
            onClick={() => handleClearResult(false)}
            sx={buttonMarginStyle}
          >
            Clear Result
          </Button>
        )}
      </Box>
      {scannerActive && (
        <Box>
          <QrScanner
            onResult={(result) => {
              scanValue(result);
              setScannerActive(false);
              setShowResult(true);
            }}
            onError={(error) => {
              console.log(error?.message);
            }}
          />
          <Button
            variant="outlined"
            onClick={() => setScannerActive(false)}
            sx={buttonMarginStyle}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default SearchBar;
