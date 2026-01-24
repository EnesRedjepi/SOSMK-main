import Box from "@mui/material/Box";
import Header from "./components/header";
import Categories from "./components/categories";
import Footer from "./components/footer";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flexGrow: 1, height: "60vh", marginTop: 5 }}>
        <Categories />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
