import React, { useState } from "react";
import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { QrScanner } from "@yudiel/react-qr-scanner";

function SearchBar(props) {
  const [search, setSearch] = useState("");
  const [scannerActive, setScannerActive] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Container maxWidth="sm">
      <TextField
        id="outlined-search"
        placeholder="Search image with description"
        type="search"
        onChange={handleSearchChange}
        value={search}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            props.searchValue(search);
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.15)",
                  },
                }}
                onClick={() => props.searchValue(search)}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <QrCodeScannerIcon
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.15)",
                  },
                }}
                onClick={() => setScannerActive(true)}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          width: "800px",
          maxWidth: "100%",
          background: "#303030",
          my: 5,
        }}
      />
      {scannerActive && (
        <QrScanner
          onDecode={(result) => {
            console.log("result", result);
            props.scanValue(result);
            setScannerActive(false);
          }}
          onError={(error) => console.log(error?.message)}
        />
      )}
    </Container>
  );
}

export default SearchBar;
