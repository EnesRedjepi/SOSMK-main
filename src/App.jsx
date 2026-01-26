import Box from "@mui/material/Box";
import Header from "./components/header";
import Categories from "./components/categories";
import Footer from "./components/footer";
import AppBar from "@mui/material/AppBar";

function App() {
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1, marginTop: 5, marginBottom: 23 }}>
        <Categories />
      </Box>
      <AppBar
        position="fixed"
        component="footer"
        sx={{ top: "auto", bottom: 0, width: "100%" }}
      >
        <Footer />
      </AppBar>
    </>
  );
}

export default App;
