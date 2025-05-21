import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import "./SideBar.css";
import { useContext } from "react";
import { AcordeContext } from "../context/AcordeContext";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { LibraryMusic } from "@mui/icons-material";

export default function ListaPrueba() {
  const navigate = useNavigate();
  const {user,authenticated} = useContext(AcordeContext);
  const redirigir = (ruta) => {
    navigate(ruta);
    setState(false)
  };

  const [state, setState] = React.useState({
    left: false,
  });
  const [openLists, setOpenLists] = React.useState({}); // Estado para controlar qué listas están abiertas

  const handleClick = (label) => {
    setOpenLists({ ...openLists, [label]: !openLists[label] });
  };

  const toggleDrawer = (open)  => {
    setState({ left: open });
  };

  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      className="d-flex justify-content-between flex-column h-100"
    >
      <div className="d-flex flex-column justify-content-center align-items-start mt-5">
      {authenticated && (
          <ListItemButton
            onClick={() => redirigir("/admin")}
            component="a"
            className="w-100"
          >
            <ListItemIcon>
            <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        )}

        {authenticated && (
          <ListItemButton
            onClick={() => redirigir("/listarInscriptos")}
            component="a"
            className="w-100"
          >
            <ListItemIcon>
            <LockPersonIcon />
            </ListItemIcon>
            <ListItemText primary="Inscripciones" />
          </ListItemButton>
        )}

        {authenticated && (
          <ListItemButton
            onClick={() => redirigir("/editarInscripciones")}
            component="a"
            className="w-100"
          >
            <ListItemIcon>
              <LockPersonIcon />
            </ListItemIcon>
            <ListItemText primary="Editar Inscripción" />
          </ListItemButton>
        )}

        {authenticated && (
          <ListItemButton
            onClick={() => redirigir("/listarPreInscriptos")}
            component="a"
            className="w-100"
          >
            <ListItemIcon>
            <LockPersonIcon />
            </ListItemIcon>
            <ListItemText primary="PreInscripciones" />
          </ListItemButton>
        )}
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="footer text-center">Acorde - 2025</p>
      </div>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={()=>toggleDrawer(true)}
      >
        <LibraryMusic fontSize="large"/>

      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={()=>toggleDrawer(false)}
        onOpen={()=>toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
