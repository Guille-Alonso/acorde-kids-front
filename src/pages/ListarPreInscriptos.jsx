import React, { useState } from "react";
import useGet from "../hooks/useGet";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  CircularProgress,
  Container,
  Button,
} from "@mui/material";
import { exportToExcel } from "../utils/exportarExcel";
import { obtenerHoraArgentina } from "../utils/obtenerFechaYHoraActual";
import axios from "../config/axios";

const ListarPreInscriptos = () => {
  const columnas = [
    "Alumno",
    "Edad",
    "Celular",
    "Padre/Madre",
    "Teléfono",
    "Email",
    "Nivel",
    "Clases",
    "Días",
    "Muestra",
    "Música Fav",
    "Comentario",
    "Otro Instrumento",
  ];

  const [
    { preInscriptos },
    loadingPreInscriptos,
    getPreInscriptos,
    setPreInscriptos,
  ] = useGet("/formularios/listarPreInscriptos", axios);
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Filas por página

  // Manejar cambios de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Manejar cambio en filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Determinar los datos que se mostrarán en la página actual
  const displayedData =
    !loadingPreInscriptos &&
    preInscriptos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const clearArray = (data) => {
      return data.map(({ _id, __v, ...rest }) => rest);
    };
    

    const handleExport = () => {
      exportToExcel(clearArray(preInscriptos), `Pre-Inscripción al ${obtenerHoraArgentina()}`);
    };

  return (
    <>
      <Container
        maxWidth={false}
        sx={{ backgroundColor: "#9AB1BC", padding: "16px" }}
      >
        {!loadingPreInscriptos ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columnas.map((columna, index) => (
                    <TableCell key={index}>{columna}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((inscripto, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {`${inscripto.nombre} ${inscripto.apellido}`}
                    </TableCell>

                    {/* <TableCell>{inscripto.apellido}</TableCell> */}
                    <TableCell>{inscripto.edad}</TableCell>
                    <TableCell>{inscripto.numCel || "-"}</TableCell>
                    <TableCell>
                    {`${inscripto.nombrePadre} ${inscripto.apellidoPadre}`}
                    </TableCell>
                    <TableCell>{inscripto.telefonoPadre}</TableCell>
                    {/* <TableCell>{inscripto.apellidoPadre}</TableCell> */}
                    <TableCell>{inscripto.emailPadre}</TableCell>
                    <TableCell>{inscripto.nivel}</TableCell>
                    <TableCell>{inscripto.clases.join(", ")}</TableCell>
                    <TableCell>{inscripto.dias.join(", ")}</TableCell>
                    <TableCell>
                      {inscripto.participaMuestra ? "Sí" : "No"}
                    </TableCell>
                    <TableCell>{inscripto.estiloMusica || "-"}</TableCell>
                    <TableCell>{inscripto.comentario || "-"}</TableCell>
                    <TableCell>{inscripto.otroInstrumento || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Componente de paginación */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={preInscriptos.length} // Total de filas
              rowsPerPage={rowsPerPage} // Filas por página
              page={page} // Página actual
              onPageChange={handleChangePage} // Cambio de página
              onRowsPerPageChange={handleChangeRowsPerPage} // Cambio de filas por página
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
              }
            />
          </TableContainer>
        ) : (
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
        )}
      </Container>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ marginTop: "5px" }}
          variant="outlined"
          color="success"
          disabled={loadingPreInscriptos}
          onClick={handleExport}
        >
          Excel
        </Button>
      </div>
    </>
  );
};

export default ListarPreInscriptos;
