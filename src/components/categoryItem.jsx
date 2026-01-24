import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CategoryItem({ category, onClick }) {
  return (
    <Card
      sx={{
        width: 150,
        height: 150,
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Box sx={{ mb: 1 }}>
            <FontAwesomeIcon icon={category.icon} size="2x" />
          </Box>

          <Typography variant="subtitle1" fontWeight={600}>
            {category.label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CategoryItem;
