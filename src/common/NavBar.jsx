import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SideBar from "./SideBar";
import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logoMuni from "../assets/logoAcorde.jpeg";
import { AcordeContext } from "../context/AcordeContext";

export default function NavBar() {

  const { getAuth, authenticated, logout, user } = useContext(AcordeContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const goToPerfil = () => {
    setAnchorEl(null);
    
    const url = new URL(`https://perfil.smt.gob.ar/`);
    url.searchParams.append("auth", localStorage.getItem("token"));
    url.searchParams.append("origin", "catastro");
    window.location.href = url.toString();

  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setAnchorEl(null);
  };

  useEffect(() => {
    getAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {authenticated ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar className="colorNav" position="static">
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <SideBar />

              {/* <img src={logoMuni} className="logoMuni2" /> */}
              <Box
                sx={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ marginRight: 1, display: { xs: "none", md: "block" } }}
                >
                  {user.nombre}
                </Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  className="logOut"
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/* <MenuItem onClick={goToPerfil}>Mi perfil</MenuItem> */}
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
}
