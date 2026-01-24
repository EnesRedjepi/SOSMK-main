import { useState } from "react";
import Box from "@mui/material/Box";
import CategoryItem from "./categoryItem";
import CategoryModal from "./categoryModal";
import { categories } from "../utils/constants";

function Categories() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpen = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
          gap: 4,
          maxWidth: 700, // 4 * 150 + gaps
          mx: "auto",
        }}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onClick={() => handleOpen(category)}
          />
        ))}
      </Box>

      <CategoryModal
        open={open}
        category={selectedCategory}
        onClose={handleClose}
      />
    </>
  );
}

export default Categories;
