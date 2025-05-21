import React from "react";
import { Grid, FormControlLabel, Checkbox, Typography, Box, FormHelperText, CircularProgress, useMediaQuery } from "@mui/material";
import "./FormularioInicial.css"
import useGet from "../hooks/useGet";
import rubitoConGuitarra from "../assets/rubitoConGuitarra.jpg"
import axios from "../config/axios";

const ProgramacionSemanal = ({
  edad,
  formValues,
  handleCheckboxChangeDisciplinas6a9,
  handleCheckboxChangeDisciplinas10a15,
  errors,disciplinasRef,focusedField,handleFocus

}) => {
  // const horarios = [
  //   {
  //     rangoEdad: [6, 9],
  //     titulo: "6 a 9 años",
  //     dias: [
  //       { dia: "Lunes", horario: "18.30hs a 19.30hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
  //       { dia: "Martes", horario: "18.30hs a 19.30hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
  //       { dia: "Miércoles", horario: "18.30hs a 19.30hs", disciplinas: ["Guitarra", "Ukelele", "Canto", "Violín"] },
  //       { dia: "Jueves", horario: "18.30hs a 19.30hs", disciplinas: ["Piano", "Canto"] },
  //       { dia: "Viernes", horario: "18.30hs a 19.30hs", disciplinas: ["Canto", "Guitarra", "Percusión"] },
  //     ],
  //   },
  //   {
  //     rangoEdad: [10, 15],
  //     titulo: "10 a 15 años",
  //     dias: [
  //       { dia: "Lunes", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
  //       { dia: "Martes", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
  //       { dia: "Miércoles", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Ukelele", "Violín"] },
  //       { dia: "Jueves", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Piano", "Canto"] },
  //       { dia: "Viernes", horario: "20hs a 21hs", disciplinas: ["Canto", "Guitarra", "Percusión"] },
  //     ],
  //   },
  // ];

  const [
    { horarios },
    loadingHorarios,
    getHorarios,
    setHorarios,
  ] = useGet("/formularios/horarios", axios);

  // Función para validar si se permite seleccionar más disciplinas
  const canSelectDiscipline6a9 = (grupoIndex, dia, disciplina) => {
    const disciplinasSeleccionadas = formValues.disciplinas6a9.filter((d) => d.startsWith(`${dia}-`));
    const totalSemanal = formValues.disciplinas6a9.filter((d) =>
      horarios[grupoIndex].dias.some((diaObj) => d.startsWith(diaObj.dia))
    ).length;

    // Una disciplina por día y hasta dos disciplinas semanales
    if (disciplinasSeleccionadas.length > 0 && !formValues.disciplinas6a9.includes(`${dia}-${disciplina}`)) {
      return false;
    }
    if (totalSemanal >= 2 && !formValues.disciplinas6a9.includes(`${dia}-${disciplina}`)) {
      return false;
    }
    return true;
  };

  const canSelectDiscipline10a15 = (grupoIndex, dia, disciplina) => {
    const disciplinasSeleccionadas = formValues.disciplinas10a15.filter((d) => d.startsWith(`${dia}-`));
    const totalSemanal = formValues.disciplinas10a15.filter((d) =>
      horarios[grupoIndex].dias.some((diaObj) => d.startsWith(diaObj.dia))
    ).length;

    // Una disciplina por día y hasta dos disciplinas semanales
    if (disciplinasSeleccionadas.length > 0 && !formValues.disciplinas10a15.includes(`${dia}-${disciplina}`)) {
      return false;
    }
    if (totalSemanal >= 2 && !formValues.disciplinas10a15.includes(`${dia}-${disciplina}`)) {
      return false;
    }
    return true;
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Cambia la dirección a columna
    justifyContent: 'center',
    alignItems: 'center'
  };

  
  const imageStyleRubitoConGuitarra = {
    maxWidth: '100vw',
    maxHeight: '55vh', // Ajusta la altura máxima si es necesario
    borderRadius: '8px', // Borde opcional para estilizar
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ padding: 2 }}>
      <Typography sx={{ color: '#DFA57C' }} variant="h5" align="center" gutterBottom>
        PROGRAMACIÓN SEMANAL
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        (Se puede elegir una disciplina por día y hasta dos disciplinas
        semanales)
      </Typography>
      {!loadingHorarios ? (
        <Grid container spacing={4}>
          {!loadingHorarios &&
            horarios.map((grupo, grupoIndex) => {
              const isHabilitado =
                edad >= grupo.rangoEdad[0] && edad <= grupo.rangoEdad[1];

                return (
                  <>
                    {grupoIndex === 1 && isSmallScreen && (
                      <Grid container style={containerStyle}>
                        <img
                          src={rubitoConGuitarra}
                          alt="Centrada"
                          style={imageStyleRubitoConGuitarra}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} md={6} key={grupoIndex}>
                      <Typography
                        sx={{
                          marginBottom: { md: 2 },
                          marginTop: {
                            xs: grupo.titulo == "6 a 9 años" ? 2 : 0,
                            md: 3,
                          },
                          color: "#9AB1BC",
                        }}
                        variant="h6"
                        align="center"
                        color={isHabilitado ? "textPrimary" : "textSecondary"}
                      >
                        (Edad {grupo.titulo})
                      </Typography>
                      {grupo.dias.map((dia, idx) => (
                        <Box key={idx} sx={{ marginBottom: 2 }}>
                          <Typography variant="subtitle1">
                            {dia.dia.toUpperCase()} {dia.horario}
                          </Typography>
                          {dia.disciplinas.map((disciplina, i) => (
                            <FormControlLabel
                              onFocus={() => handleFocus("disciplinas6a9")}
                              error={!!errors.disciplinas}
                              sx={{
                                "& .MuiFormLabel-root.Mui-focused": {
                                  color:
                                    focusedField === "dias"
                                      ? "#9AB1BC"
                                      : undefined,
                                },
                                "& .MuiOutlinedInput-root.Mui-focused": {
                                  "& fieldset": {
                                    borderColor: "#DFA57C", // Color que toma el campo en foco
                                  },
                                },
                                "& .MuiCheckbox-root.Mui-checked": {
                                  color: "#DFA57C", // Cambia el color cuando está marcado
                                },
                                "& .MuiFormLabel-root:not(.Mui-focused)": {
                                  color: "#DFA57C", // Color que se mantiene cuando pierde el foco
                                },
                              }}
                              key={i}
                              control={
                                <Checkbox
                                  inputRef={disciplinasRef}
                                  checked={
                                    grupoIndex === 0
                                      ? formValues.disciplinas6a9.includes(
                                          `${dia.dia}-${disciplina.disciplina}`
                                        )
                                      : formValues.disciplinas10a15.includes(
                                          `${dia.dia}-${disciplina.disciplina}`
                                        )
                                  }
                                  onChange={(e) =>
                                    grupoIndex === 0
                                      ? handleCheckboxChangeDisciplinas6a9(
                                          e,
                                          dia.dia,
                                          disciplina.disciplina,
                                          disciplina
                                        )
                                      : handleCheckboxChangeDisciplinas10a15(
                                          e,
                                          dia.dia,
                                          disciplina.disciplina,
                                          disciplina
                                        )
                                  }
                                  value={`${dia.dia}-${disciplina.disciplina}`}
                                  disabled={
                                    !isHabilitado ||
                                    (grupoIndex === 0
                                      ? !canSelectDiscipline6a9(
                                          grupoIndex,
                                          dia.dia,
                                          disciplina.disciplina
                                        )
                                      : !canSelectDiscipline10a15(
                                          grupoIndex,
                                          dia.dia,
                                          disciplina.disciplina
                                        )) ||
                                    disciplina.disciplina == "Percusión" || (disciplina.disciplina == "Canto" && dia.dia == "Viernes")
                                  } // Deshabilita según las reglas
                                />
                              }
                              label={disciplina.disciplina}
                            />
                          ))}
                        </Box>
                      ))}
                    </Grid>
                  </>
                );
            })}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: {xs:"center",md:"end"},
            alignItems: "center",
            height: "20vh", // Ocupa todo el alto de la ventana
          }}
        >
          <CircularProgress sx={{ color: "#DFA57C" }} />
        </Box>
      )}
      {errors.disciplinas &&
        formValues.disciplinas6a9.length == 0 &&
        formValues.disciplinas10a15.length == 0 && (
          <FormHelperText>{errors.disciplinas}</FormHelperText>
        )}
    </Box>
  );
};

export default ProgramacionSemanal;