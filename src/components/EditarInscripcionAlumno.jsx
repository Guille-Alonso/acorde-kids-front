import { useState } from "react";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, IconButton, Box, CircularProgress, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useGet from "../hooks/useGet";
import axios from "../config/axios";
import EditIcon from '@mui/icons-material/Edit';

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const disciplinas = ["Canto", "Guitarra", "Piano", "Ukelele", "Violín", "Percusión"];

export default function EditarInscripcionAlumno() {
    const [
        { inscriptos },
        loadingInscriptos,
        getInscriptos,
        setInscriptos,
      ] = useGet("/formularios/listarInscriptos", axios);

  const [busqueda, setBusqueda] = useState("");
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [disciplinaSeleccionada, setDisciplinaSeleccionada] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState("");

  const alumnosFiltrados = !loadingInscriptos && inscriptos.filter(
    (a) =>
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.apellido.toLowerCase().includes(busqueda.toLowerCase())
  );

  const manejarEdicion = (alumno) => {
    
    setAlumnoSeleccionado(alumno);
  };

  const agregarDisciplina = () => {
    if (!disciplinaSeleccionada || !diaSeleccionado) return;
    
    const esGrupo6a9 = alumnoSeleccionado.edad >= 6 && alumnoSeleccionado.edad <= 9;
    const grupo = esGrupo6a9 ? "disciplinas6a9" : "disciplinas10a15";
    
    if (alumnoSeleccionado[grupo].length >= 2) return;
    if (alumnoSeleccionado[grupo].some((d) => d.startsWith(diaSeleccionado))) return;
    
    setAlumnoSeleccionado((prev) => ({
      ...prev,
      [grupo]: [...prev[grupo], `${diaSeleccionado}-${disciplinaSeleccionada}`]
    }));
  
    limpiarCampos();
  };

  const limpiarCampos = () =>{
    setDisciplinaSeleccionada("");
    setDiaSeleccionado("");
  }

  const eliminarDisciplina = (disciplina) => {
    const esGrupo6a9 = alumnoSeleccionado.edad >= 6 && alumnoSeleccionado.edad <= 9;
    const grupo = esGrupo6a9 ? "disciplinas6a9" : "disciplinas10a15";
    
    setAlumnoSeleccionado((prev) => ({
      ...prev,
      [grupo]: prev[grupo].filter((d) => d !== disciplina)
    }));

    limpiarCampos();
  };

  const [botonState, setBotonState] = useState(false)
  const editarInscripcionAlumno = async () => {
    setBotonState(true);
    try {

        const {data} = await axios.patch(`formularios/editarInscripcionAlumno/${alumnoSeleccionado._id}`,alumnoSeleccionado);
        
        setAlumnoSeleccionado(null);
        getInscriptos();
        limpiarCampos();
    } catch (error) {
        console.log(error);
        
    }
    setBotonState(false);
  }

  const cerrarModal = () =>{
    setAlumnoSeleccionado(null);
    limpiarCampos();
  }

  return (
    <div>
      <TextField
        label="Buscar Alumno"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {
        !loadingInscriptos ?
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Edad</TableCell>
                  <TableCell>Disciplinas</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loadingInscriptos &&
                  alumnosFiltrados.map((alumno) => (
                    <TableRow key={alumno._id}>
                      <TableCell>{alumno.nombre}</TableCell>
                      <TableCell>{alumno.apellido}</TableCell>
                      <TableCell>{alumno.edad}</TableCell>
                      <TableCell>
                        {alumno.edad <= 9
                          ? alumno.disciplinas6a9.join(", ")
                          : alumno.disciplinas10a15.join(", ")}
                      </TableCell>
                      {/* <TableCell>
                        <Button
                          onClick={() => manejarEdicion(alumno)}
                          variant="contained"
                        >
                          Editar
                        </Button>
                      </TableCell> */}
                      <TableCell>
                        <Tooltip title="Editar">
                          <IconButton onClick={() => manejarEdicion(alumno)} color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))



                }
              </TableBody>
            </Table>
          </TableContainer>
          :
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              height: "96vh", // Ocupa todo el alto de la ventana
            }}
          >
            <CircularProgress sx={{ color: "#DFA57C" }} />
          </Box>
      }

      {alumnoSeleccionado && (
        <Dialog
          open={!!alumnoSeleccionado}
          //   onClose={() => setAlumnoSeleccionado(null)}
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              setAlumnoSeleccionado(null);
            }
          }}
        >
          <DialogTitle>Editar Alumno</DialogTitle>
          <DialogContent>
            <p>
              <strong>Nombre:</strong> {alumnoSeleccionado.nombre}
            </p>
            <p>
              <strong>Apellido:</strong> {alumnoSeleccionado.apellido}
            </p>
            <p>
              <strong>Edad:</strong> {alumnoSeleccionado.edad}
            </p>
            <p>
              <strong>Disciplinas:</strong>
            </p>
            {alumnoSeleccionado.edad <= 9
              ? alumnoSeleccionado.disciplinas6a9.map((disciplina) => (
                  <div key={disciplina}>
                    {disciplina}
                    <IconButton onClick={() => eliminarDisciplina(disciplina)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))
              : alumnoSeleccionado.disciplinas10a15.map((disciplina) => (
                  <div key={disciplina}>
                    {disciplina}
                    <IconButton onClick={() => eliminarDisciplina(disciplina)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
            <Select
              value={diaSeleccionado}
              onChange={(e) => setDiaSeleccionado(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccione un día
              </MenuItem>
              {dias.map((dia) => (
                <MenuItem key={dia} value={dia}>
                  {dia}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={disciplinaSeleccionada}
              onChange={(e) => setDisciplinaSeleccionada(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccione una disciplina
              </MenuItem>
              {disciplinas.map((disc) => (
                <MenuItem key={disc} value={disc}>
                  {disc}
                </MenuItem>
              ))}
            </Select>
            <Button
              onClick={agregarDisciplina}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Agregar Disciplina
            </Button>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button
              variant="contained"
              onClick={cerrarModal}
            >
              Cancelar
            </Button>
            <Button
              disabled={botonState}
              variant="contained"
              color="warning"
              onClick={editarInscripcionAlumno}
            >
              Finalizar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}