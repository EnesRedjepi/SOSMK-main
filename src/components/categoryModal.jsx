import { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { cities, emergencyNumbers } from "../utils/constants";

function CategoryModal({ open, category, onClose }) {
  const [form, setForm] = useState({
    description: "",
    city: "",
    location: "",
    shareLocation: false,
    showPersonalData: false,
    name: "",
    surname: "",
    phone: "",
    image: null,
  });

  const [cameraOpen, setCameraOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  if (!category) return null;

  const isEmergency = category.id === "emergencyCall";

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const openCameraChoice = () => setCameraOpen(true);
  const closeCameraChoice = () => setCameraOpen(false);

  const openGallery = () => {
    fileInputRef.current?.click();
    closeCameraChoice();
  };

  const openCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera permission granted");
    } catch (err) {
      console.log("Camera access denied, using gallery");
    }
    fileInputRef.current?.click();
    closeCameraChoice();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm((prev) => ({ ...prev, image: e.target.result }));
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const payload = {
      category,
      description: form.description,
      city: form.city,
      location: form.location,
      shareLocation: form.shareLocation,
      personalData: form.showPersonalData
        ? {
            name: form.name,
            surname: form.surname,
            phone: form.phone,
          }
        : null,
      image: form.image,
    };
    console.log("SUBMIT REPORT:", payload);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: 64,
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {category?.label}
          </Typography>

          {!isEmergency && (
            <IconButton
              onClick={openCameraChoice}
              size="small"
              color="primary"
              sx={{ ml: 1 }}
            >
              <PhotoCamera />
            </IconButton>
          )}
        </DialogTitle>

        <DialogContent dividers>
          {!isEmergency && imagePreview && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption">Photo preview:</Typography>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </Box>
          )}

          {isEmergency ? (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Emergency numbers of North Macedonia:
              </Typography>
              {emergencyNumbers.map((item) => (
                <Box
                  key={item.name}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>{item.name}</Typography>
                  <Typography fontWeight="bold">{item.number}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                You are reporting an incident related to{" "}
                <b>{category?.label}</b>.
              </Typography>

              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                value={form.description}
                onChange={handleChange("description")}
                sx={{ mb: 2 }}
              />

              <TextField
                select
                label="City"
                fullWidth
                value={form.city}
                onChange={handleChange("city")}
                sx={{ mb: 2 }}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Location (street, landmark, etc.)"
                fullWidth
                value={form.location}
                onChange={handleChange("location")}
                sx={{ mb: 2 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={form.shareLocation}
                    onChange={handleChange("shareLocation")}
                  />
                }
                label="Show your location"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={form.showPersonalData}
                    onChange={handleChange("showPersonalData")}
                  />
                }
                label="Send your data"
              />

              {form.showPersonalData && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={form.name}
                    onChange={handleChange("name")}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Surname"
                    fullWidth
                    value={form.surname}
                    onChange={handleChange("surname")}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Phone Number"
                    fullWidth
                    value={form.phone}
                    onChange={handleChange("phone")}
                  />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        {!isEmergency && (
          <DialogActions>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Send Report
            </Button>
          </DialogActions>
        )}

        {isEmergency && (
          <DialogActions>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {!isEmergency && (
        <>
          <Dialog open={cameraOpen} onClose={closeCameraChoice}>
            <DialogTitle>Choose photo source</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<PhotoCamera />}
                  onClick={openCamera}
                >
                  Camera
                </Button>
                <Button variant="outlined" fullWidth onClick={openGallery}>
                  Gallery
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeCameraChoice}>Cancel</Button>
            </DialogActions>
          </Dialog>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </>
      )}
    </>
  );
}

export default CategoryModal;
