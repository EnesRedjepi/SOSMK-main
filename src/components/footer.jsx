import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import mvrLogo from "../assets/mvr_logo.png";

const footerLinks = [
  { label: "PRIVACY POLICY", href: "#" },
  { label: "TERMS OF SERVICE", href: "#" },
  { label: "CONTACT", href: "#" },
];

function Footer() {
  return (
    <AppBar
      position="static"
      component="footer"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            py: { xs: 3, md: 2 },
            gap: 1,
          }}
        >
          {/* Left: Logo + App Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={mvrLogo}
              alt="MVR Logo"
              style={{ height: 32, width: "auto" }}
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, letterSpacing: ".15rem" }}
            >
              SOSMK
            </Typography>
          </Box>

          {/* Center: Links */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.9rem" }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 400, letterSpacing: ".15rem" }}
                >
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Stack>

          {/* Right: Copyright */}
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} SOSMK. All rights reserved!
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
