import React from 'react';
import logoAcorde from "../assets/caratulaAppRecor.jpg";
import logoAcorde2 from "../assets/caratulaAppRecor2.jpg";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Cambia la dirección a columna
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  const containerStyleDivButton = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '26px'
  };

  const imageStyle = {
    maxWidth: '100vw',
    maxHeight: '70vh', // Ajusta la altura máxima si es necesario
    borderRadius: '8px', // Borde opcional para estilizar
  };

  const imageStyle2 = {
    maxWidth: '100vw',
    maxHeight: '15vh', // Ajusta la altura máxima si es necesario
    borderRadius: '8px', // Borde opcional para estilizar
  };

  const navigate = useNavigate()
  return (
    <div style={containerStyle}>
      <img src={logoAcorde} alt="Centrada" style={imageStyle} />
      {/* <p className="masInfo">¿Querés mas info?</p> */}
      <div style={containerStyleDivButton}>
        <ArrowForwardIcon fontSize='large' />
        <Button
          sx={{ margin: "15px 0" }}
          size="large"
          className="botonInicialAcorde"
          onClick={() => navigate("/formInicial")}
          variant="outlined"
        >
          HORARIOS Y PRECIOS
        </Button>
        <ArrowBackIcon fontSize='large' />
      </div>
      <img src={logoAcorde2} alt="Centrada" style={imageStyle2} />
    </div>
  );
};

export default Home;
