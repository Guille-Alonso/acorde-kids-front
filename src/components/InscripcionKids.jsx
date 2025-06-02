import React, { useRef, useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  Box,
  Grid,
  FormHelperText,
  styled,
  StepLabel,
  Snackbar,
  Alert,
  useMediaQuery,
  Typography,
} from '@mui/material';
import nenaInicio from "../assets/inicioForm.jpg"
// import niñopianocortado from "../assets/bomboytrompetacortado.jpeg"
import niñopianocortado from "../assets/bombomejorada.jpeg"
import rubitoConGuitarra from "../assets/rubitoConGuitarra.jpg"
import luchaCanta from "../assets/guitarra.jpeg"
import cantora from "../assets/parlante.jpeg"
import pibeOk from "../assets/pibeOk.jpg"
import "./FormularioInicial.css"
import { INSCRIPCION_VALUES, INSCRIPCION_VALUES_KIDS, PREINSCRIPCION_VALUES } from '../helpers';
import { useNavigate } from 'react-router-dom';
import ProgramacionSemanal from './ProgramacionSemanal';
import axios from '../config/axios';

const InscripcionKids = () => {
  const [formValues, setFormValues] = useState(INSCRIPCION_VALUES_KIDS);

const [errors, setErrors] = useState({});
const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value
    });
    
  };

const handleFocus = (name) => {
  setFocusedField(name);
};

const otroRef = useRef(null);

const nombreAlumnoRef = useRef(null);
const apellidoAlumnoRef = useRef(null);
const edadAlumnoRef = useRef(null);

const nombrePadreRef = useRef(null);
const apellidoPadreRef = useRef(null);
const telefonoPadreRef = useRef(null);
const emailPadreRef = useRef(null);

const dia = useRef(null);

  const validate = () => {
    const newErrors = {};

    if (!formValues.dia){
      newErrors.dia = 'Seleccione una día por favor';
      if (dia.current) dia.current.focus();
    } 

    if (!formValues.nombre){
      newErrors.nombre = 'El nombre es obligatorio';
      if (nombreAlumnoRef.current) nombreAlumnoRef.current.focus();
    } 

    if (!formValues.apellido) {
      newErrors.apellido = 'El apellido es obligatorio';
      if (apellidoAlumnoRef.current) apellidoAlumnoRef.current.focus();
    }

    if (!formValues.edad || isNaN(formValues.edad) || !Number(formValues.edad) > 0 || Number(formValues.edad) < 4 || formValues.edad < 4 || formValues.edad > 5){
      newErrors.edad = 'Debe tener entre 4 y 5 años';
      if (edadAlumnoRef.current) edadAlumnoRef.current.focus();
    }

    if (!formValues.nombrePadre){
      newErrors.nombrePadre = 'El nombre del padre es obligatorio';
      if (nombrePadreRef.current) nombrePadreRef.current.focus();
    } 

    if (!formValues.apellidoPadre){
      newErrors.apellidoPadre = 'El apellido del padre es obligatorio';
      if (apellidoPadreRef.current) apellidoPadreRef.current.focus();
    } 

    if (!formValues.telefonoPadre){
      newErrors.telefonoPadre = 'Debe ingresar un teléfono de contacto';
      if (telefonoPadreRef.current) telefonoPadreRef.current.focus();
    } 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.emailPadre || !emailRegex.test(formValues.emailPadre)){
      newErrors.emailPadre = 'Debe ingresar un email válido'
      if (emailPadreRef.current) emailPadreRef.current.focus();
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [botonState, setBotonState] = useState(false);
  const [notificacion, setNotificacion] = useState({mensaje:"",tipo:""})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setBotonState(true);
    e.preventDefault();
    try {
      if (validate()) {
        // console.log('Formulario válido:', formValues);
        // alert('Formulario enviado correctamente');
        const {data} = await axios.post("formularios/inscripcionKids",formValues)
        // console.log(data);
        setNotificacion({mensaje:"¡Inscripción exitosa!", tipo:"success"})
        handleOpenNotify();
        setFormValues(INSCRIPCION_VALUES_KIDS);
        localStorage.setItem("monto","$40.000");
        setTimeout(() => {
           navigate("/preinscripcionExitosa")
        }, 3000);
       
      } else {
        console.log('Errores en el formulario:', errors);
      }
    } catch (error) {
      handleOpenNotify();
      setNotificacion({mensaje: error?.response?.data.message || error.message, tipo:"error"})
      console.log(error)
      setBotonState(false);
    }
    setBotonState(false);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Cambia la dirección a columna
    justifyContent: 'center',
    alignItems: 'center'
  };

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Estilos condicionales
  const imageStyleInicioForm = {
    borderRadius: '8px',
    maxWidth: isSmallScreen ? '100%' : '40vw', // Ancho 100% en pantallas pequeñas, auto en otras
    maxHeight: isSmallScreen ? '65vh' : '70vh', // Ajusta la altura en pantallas pequeñas
  };

  const imageStyleRubitoConGuitarra = {
    maxWidth: '100vw',
    maxHeight: '55vh', // Ajusta la altura máxima si es necesario
    borderRadius: '8px', // Borde opcional para estilizar
  };

  const imageStylePibeOK = {
    maxWidth: '90vw',
    maxHeight: '50vh', // Ajusta la altura máxima si es necesario
    borderRadius: '8px', // Borde opcional para estilizar
  };


  const handleCheckboxChangeClases = (event) => {
    const { value, checked } = event.target;
    setFormValues((prevState) => {
      if (checked) {
        // Agregar al array
        
        return { ...prevState, clases: [...prevState.clases, value] };
      } else {
        // Quitar del array
        return {
          ...prevState,
          clases: prevState.clases.filter((clase) => clase !== value),
          otroInstrumento: value === "Otro" ? "" : prevState.otroInstrumento,
        };
      }
    });
      
  };
  

  const handleCheckboxChangeDias = (event) => {
    const { value, checked } = event.target;
    setFormValues((prevState) => {
      if (checked) {
        // Agregar al array
        return { ...prevState, dias: [...prevState.dias, value] };
      } else {
        // Quitar del array
        return {
          ...prevState,
          dias: prevState.dias.filter((dia) => dia !== value),
        };
      }
    });
  };

   const handleCheckboxChange = (diaSeleccionado) => {
    setFormValues({...formValues, dia: diaSeleccionado });
  };

  const [open, setOpen] = useState(false);

  // Función para manejar la apertura y cierre de la alerta
  const handleOpenNotify = () => {
    setOpen(true); // Mostrar la alerta
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Ignorar el cierre al hacer clic fuera
    }
    setOpen(false); // Cerrar la alerta
  };

  const handleCheckboxChangeDisciplinas6a9 = (event, dia, disciplina,obj) => {
    
    const value = `${dia}-${disciplina}`;
    setFormValues((prevValues) => {
      const { disciplinas6a9,idDisciplina } = prevValues;
      // const { disciplinas6a9 } = prevValues;
      if (event.target.checked) {
        // Si está seleccionado, agregar la disciplina
        return { ...prevValues, disciplinas6a9: [...disciplinas6a9, value],  idDisciplina: [...idDisciplina, obj._id]};
        // return { ...prevValues, disciplinas6a9: [...disciplinas6a9, value]};
      } else {
        // Si está deseleccionado, quitar la disciplina
        return {
          ...prevValues,
          disciplinas6a9: disciplinas6a9.filter((item) => item !== value),
          idDisciplina: idDisciplina.filter((item) => item !== obj._id)
        };
      }
    });
  };

  const handleCheckboxChangeDisciplinas10a15 = (event, dia, disciplina,obj) => {
  
    const value = `${dia}-${disciplina}`;
    setFormValues((prevValues) => {
      const { disciplinas10a15, idDisciplina } = prevValues;
      if (event.target.checked) {
        // Si está seleccionado, agregar la disciplina
        // return { ...prevValues,  disciplinas10a15: [...disciplinas10a15, value] };
        return { ...prevValues, disciplinas10a15: [...disciplinas10a15, value],  idDisciplina: [...idDisciplina, obj._id]};
      } else {
        // Si está deseleccionado, quitar la disciplina
        return {
          ...prevValues,
          disciplinas10a15: disciplinas10a15.filter((item) => item !== value),
          idDisciplina: idDisciplina.filter((item) => item !== obj._id)
        };
      }
    });
  };

  return (
    <div style={containerStyle}>
      <Box
        sx={{
          maxWidth: 800,
          padding: "10px",
          boxShadow: 3,
          borderRadius: 2,
          // backgroundColor: "#f9f9f9",
          marginTop: 1,
        }}
      >
        <Grid container style={containerStyle}>
          <img
            src={niñopianocortado}
            alt="Centrada"
            style={imageStyleInicioForm}
          />
          <StepLabel sx={{ textAlign: "justify", marginTop: 1 }}>
            <Typography sx={{ color: "#9AB1BC" }}>
              Hola! Les compartimos la programación de las clases para los mas pequeños de 4 y 5 años, en la academia de ACORDE 2025, y los siguientes datos para tener en
              cuenta:
            </Typography>{" "}
            <br /> <br />
            ➡Las Clases se dictan en Juan XXIII 79 - Yerba Buena (Centro
            Markay).
            <br />
            <br />
            ➡Las clases son una vez a la semana, se puede elegir los días LUNES o JUEVES de 18.30hs a 19.30hs.
            <br />
            <br />
            ➡El valor de la cuota es de $40.000 mensual.
            <br />
            <br />
            ➡Las clases de este grupo, inician el Lunes 2 de Junio. Los grupos son con cupos reducidos, se aseguran el lugar realizando la inscripción y abonando la cuota.
          </StepLabel>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ marginTop: 2 }}>
            <p className="colorDatosAlumno" component="legend">
              Datos del alumno/a
            </p>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  inputRef={nombreAlumnoRef}
                  label="Nombre"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={(e) => {
                    // Verificar si el input contiene solo letras y acentos
                    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ maxLength: 30 }}
                  onFocus={() => handleFocus("nombre")}
                  margin="normal"
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                  fullWidth
                  sx={{
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        color: "#DFA57C",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                        {
                          "& fieldset": {
                            borderColor: "#DFA57C",
                          },
                        },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Apellido"
                  name="apellido"
                  inputRef={apellidoAlumnoRef}
                  value={formValues.apellido}
                  onChange={(e) => {
                    // Verificar si el input contiene solo letras y acentos
                    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ maxLength: 30 }}
                  onFocus={() => handleFocus("apellido")}
                  margin="normal"
                  error={!!errors.apellido}
                  helperText={errors.apellido}
                  fullWidth
                  sx={{
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        color: "#DFA57C",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                        {
                          "& fieldset": {
                            borderColor: "#DFA57C",
                          },
                        },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  inputRef={edadAlumnoRef}
                  label="Edad"
                  name="edad"
                  type="text"
                  value={formValues.edad}
                  onChange={(e) => {
                    // Verificar si el input contiene solo números
                    if (/^\d*$/.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ maxLength: 3 }}
                  onFocus={() => handleFocus("edad")}
                  margin="normal"
                  error={!!errors.edad}
                  helperText={errors.edad}
                  fullWidth
                  sx={{
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        color: "#DFA57C",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                        {
                          "& fieldset": {
                            borderColor: "#DFA57C",
                          },
                        },
                    },
                  }}
                />
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <TextField
                  label="Número de celular (opcional)"
                  name="numCel"
                  type="text"
                  value={formValues.numCel}
                  onChange={(e) => {
                    // Verificar si el input contiene solo números
                    if (/^\d*$/.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ maxLength: 12 }}
                  onFocus={() => handleFocus("numCel")}
                  margin="normal"
                  error={!!errors.numCel}
                  helperText={errors.numCel}
                  fullWidth
                  sx={{
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        color: "#DFA57C",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                        {
                          "& fieldset": {
                            borderColor: "#DFA57C",
                          },
                        },
                    },
                  }}
                />
              </Grid> */}
            </Grid>

            <p className="colorDatosAlumno" component="legend">
              Datos de padre/madre
            </p>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  inputRef={nombrePadreRef}
                  label="Nombre"
                  name="nombrePadre"
                  value={formValues.nombrePadre}
                  onChange={(e) => {
                    // Verificar si el input contiene solo letras y acentos
                    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ maxLength: 40 }}
                  onFocus={() => handleFocus("nombrePadre")}
                  margin="normal"
                  fullWidth
                  error={!!errors.nombrePadre}
                  helperText={errors.nombrePadre}
                  sx={{
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        color: "#DFA57C",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                        {
                          "& fieldset": {
                            borderColor: "#DFA57C",
                          },
                        },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  inputRef={apellidoPadreRef}
                  label="Apellido"
                  name="apellidoPadre"
                  value={formValues.apellidoPadre}
                  onChange={(e) => {
                    // Verificar si el input contiene solo letras y acentos
                    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ maxLength: 40 }}
                  onFocus={() => handleFocus("apellidoPadre")}
                  margin="normal"
                  fullWidth
                  error={!!errors.apellidoPadre}
                  helperText={errors.apellidoPadre}
                  sx={{
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        color: "#DFA57C",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                        {
                          "& fieldset": {
                            borderColor: "#DFA57C",
                          },
                        },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  inputRef={telefonoPadreRef}
                  label="Número de celular"
                  name="telefonoPadre"
                  value={formValues.telefonoPadre}
                  onChange={(e) => {
                    // Verificar si el input contiene solo números
                    if (/^\d*$/.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ maxLength: 12 }}
                  onFocus={() => handleFocus("telefonoPadre")}
                  margin="normal"
                  fullWidth
                  error={!!errors.telefonoPadre}
                  helperText={errors.telefonoPadre}
                  sx={{
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        color: "#DFA57C",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                        {
                          "& fieldset": {
                            borderColor: "#DFA57C",
                          },
                        },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  inputRef={emailPadreRef}
                  label="Email"
                  name="emailPadre"
                  value={formValues.emailPadre}
                  onChange={handleChange}
                  inputProps={{ maxLength: 40 }}
                  onFocus={() => handleFocus("emailPadre")}
                  margin="normal"
                  fullWidth
                  error={!!errors.emailPadre}
                  helperText={errors.emailPadre}
                  sx={{
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        color: "#DFA57C",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                        {
                          "& fieldset": {
                            borderColor: "#DFA57C",
                          },
                        },
                    },
                  }}
                />
              </Grid>
              {/* <Grid container style={containerStyle}>
                <img src={luchaCanta} alt="Centrada" style={imageStylePibeOK} />
              </Grid> */}
            </Grid>

            <p className="colorDatosAlumno" component="legend">
              Clases Musicales para niños de 4 a 5 años
            </p>
            <Grid container columnSpacing={2}>

              <Grid item xs={12} md={6}>
                <FormControl error={!!errors.dia} component="fieldset">

                  <FormControlLabel
                    onFocus={() => handleFocus("dia")}
                    error={!!errors.dia}
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: formValues.dia === "LUNES de 18.30hs a 19.30hs" ? "#9AB1BC" : undefined,
                      },
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& fieldset": {
                          borderColor: "#DFA57C",
                        },
                      },
                      "& .MuiCheckbox-root.Mui-checked": {
                        color: "#DFA57C",
                      },
                      "& .MuiFormLabel-root:not(.Mui-focused)": {
                        color: "#DFA57C",
                      },
                    }}
                    control={
                      <Checkbox
                        disabled
                        inputRef={dia}
                        checked={formValues.dia === "LUNES de 18.30hs a 19.30hs"}
                        // onChange={() => handleCheckboxChange("LUNES de 18.30hs a 19.30hs")}
                      />
                    }
                    label="LUNES de 18.30hs a 19.30hs"
                  />
                  {/* {errors.dia && <FormHelperText>{errors.dia}</FormHelperText>} */}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl error={!!errors.dia} component="fieldset">


                  <FormControlLabel
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: formValues.dia === "JUEVES de 18.30hs a 19.30hs" ? "#9AB1BC" : undefined,
                      },
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& fieldset": {
                          borderColor: "#DFA57C",
                        },
                      },
                      "& .MuiCheckbox-root.Mui-checked": {
                        color: "#DFA57C",
                      },
                      "& .MuiFormLabel-root:not(.Mui-focused)": {
                        color: "#DFA57C",
                      },
                    }}
                    control={
                      <Checkbox
                        disabled
                        inputRef={dia}
                        checked={formValues.dia === "JUEVES de 18.30hs a 19.30hs"}
                        // onChange={() => handleCheckboxChange("JUEVES de 18.30hs a 19.30hs")}
                      />
                    }
                    label="JUEVES de 18.30hs a 19.30hs"
                  />
                  {errors.dia && <FormHelperText>{errors.dia}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid container style={containerStyle}>
                <img src={luchaCanta} alt="Centrada" style={imageStylePibeOK} />
              </Grid>
            </Grid>

            <StepLabel sx={{ textAlign: "justify" }}>
              <Typography variant="h6" sx={{ textAlign: "justify", mb: 2 }}>
                <strong> Información del Pago</strong>
              </Typography>
              ➡La cuota debe abonarse del 1 al 10 de cada mes, transfiriendo al
              alias <strong>Acorde2025.mp</strong>
              <br />
              <br />
              ➡Enviar comprobante por correo a{" "}
              <strong>acorde.yb@gmail.com</strong>
              <br />
              {/* <br />
              ➡<strong>El pago de Marzo lo estamos solicitando ahora, para confirmar la inscripción.</strong> */}
            </StepLabel>

            <Grid item xs={12} md={12}>
              <TextField
                label="Alguna pregunta o comentario"
                name="comentario"
                value={formValues.comentario}
                onFocus={() => handleFocus("comentario")}
                onChange={handleChange}
                margin="normal"
                fullWidth
                inputProps={{ maxLength: 80 }}
                sx={{
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused, &.MuiInputLabel-shrink": {
                      color: "#9AB1BC",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                      {
                        "& fieldset": {
                          borderColor: "#9AB1BC",
                        },
                      },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img src={cantora} alt="Centrada" style={imageStylePibeOK} />
            <Button
              className="botonEnviarFormPreInscripcion"
              type="submit"
              variant="contained"
              disabled={botonState}
              sx={{ marginTop: 1 }}
            >
              Inscribir
            </Button>
          </Grid>
        </form>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={6000} // La alerta se cierra automáticamente después de 6 segundos
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Posición de la alerta
      >
        <Alert
          onClose={handleClose}
          severity={notificacion.tipo}
          sx={{ width: "100%" }}
        >
          {notificacion.mensaje}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default InscripcionKids;

