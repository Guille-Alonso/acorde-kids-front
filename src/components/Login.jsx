import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Alert, IconButton, InputAdornment } from "@mui/material";
import { AcordeContext } from "../context/AcordeContext";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css"

const Login = () => {

  const {login, botonState, authenticated, errors, setErrors } = useContext(AcordeContext);

  const [formData, setFormData] = useState({
    nombreUsuario: "",
    contraseña: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/admin");
    }
  }, [authenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.nombreUsuario || !formData.contraseña) {
      setErrors("Debe completar los campos");
      setSuccess("");
      return;
    }
  
    try {
        login(formData);
    } catch (error) {
      console.log(error);
      // setError(error.response ? error.response.data.message : error.message);
      setSuccess("");
    }
  };

  useEffect(() => {
    if (errors) {
      const timer = setTimeout(() => {
        setErrors('');
      }, 3000); // 3 segundos
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="imgLogin">

    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2, backgroundColor: "white",  boxShadow: 3 }}

    >
      <Typography variant="h5" gutterBottom>
        Iniciar Sesión
      </Typography>

      {errors && <Alert severity="error">{errors}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        label="Usuario"
        type="text"
        name="nombreUsuario"
        value={formData.nombreUsuario}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        name="contraseña"
        value={formData.contraseña}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {!showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button disabled={botonState} type="submit" variant="contained" className="colorBtnLogin" fullWidth sx={{ mt: 2 }}>
        {!botonState ? "Ingresar" : "Ingresando..."}
      </Button>

    </Box>
    </div>
  );
};

export default Login;
