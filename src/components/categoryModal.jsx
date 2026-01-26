import { useState } from "react";
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
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
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
  });

  if (!category) return null;

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));
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
    };

    console.log("SUBMIT REPORT:", payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{category?.label}</DialogTitle>
      <DialogContent dividers>
        {category.id === "emergencyCall" ? (
          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Emergency numbers of North Macedonia:
            </Typography>
            {emergencyNumbers.map((item) => (
              <Box
                key={item.name}
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>{item.name}</Typography>
                <Typography fontWeight="bold">{item.number}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              You are reporting an incident related to <b>{category?.label}</b>.
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

      {category.id != "emergencyCall" ? (
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Send Report
          </Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CategoryModal;
