import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import GalleryPage from "./pages/GalleryPage";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            margin: "0 0.5rem",
            fontWeight: "bold",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <GalleryPage />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
