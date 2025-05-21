import { Button, Container } from "@mui/material";
import { useState } from "react";
import { exportToExcel } from "../utils/exportarExcel";
import { obtenerHoraArgentina } from "../utils/obtenerFechaYHoraActual";

export default function FiltroInscriptos({ inscriptos, loadingInscriptos }) {
  const [rangoEdad, setRangoEdad] = useState("6a9");
  const [disciplina, setDisciplina] = useState("");
  const [dia, setDia] = useState("");

  const filtrarInscriptos = () => {
    return inscriptos.filter((inscripto) => {
      const disciplinas =
        rangoEdad === "6a9" ? inscripto.disciplinas6a9 : inscripto.disciplinas10a15;

      // Si no tiene disciplinas en el rango, lo descartamos
      if (disciplinas.length === 0) return false;

      // Si no hay disciplina ni día seleccionado, se muestra todo lo del rango
      if (!disciplina && !dia) return true;

      return disciplinas.some((d) => {
        const [diaDisciplina, nombreDisciplina] = d.split("-");
        return (
          (!disciplina || nombreDisciplina === disciplina) &&
          (!dia || diaDisciplina === dia)
        );
      });
    });
  };

  const clearArray = (data) => {
    return data.map(({ _id, __v, ...rest }) => rest);
  };

  const handleExport = () => {
    exportToExcel(clearArray(filtrarInscriptos()), `Inscripción al ${obtenerHoraArgentina()}`);
  };

  return (
    <Container sx={{ marginTop: "8px" }}>
      <h2>Filtrar Inscriptos</h2>
      <Container sx={{ marginTop: "10px" }}>
        <label>Edad: </label>
        <select
          value={rangoEdad}
          onChange={(e) => setRangoEdad(e.target.value)}
        >
          <option value="6a9">6 a 9 años</option>
          <option value="10a15">10 a 15 años</option>
        </select>
        <br />
        <label>Disciplina: </label>
        <select
          value={disciplina}
          onChange={(e) => setDisciplina(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Canto">Canto</option>
          <option value="Guitarra">Guitarra</option>
          <option value="Ukelele">Ukelele</option>
          <option value="Piano">Piano</option>
          <option value="Violín">Violín</option>
          <option value="Percusión">Percusión</option>
        </select>
        <br />
        <label>Día: </label>
        <select value={dia} onChange={(e) => setDia(e.target.value)}>
          <option value="">Todos</option>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miercoles">Miercoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
        </select>
      </Container>

      <Button
        sx={{ marginTop: "10px", marginBottom: "15px" }}
        variant="outlined"
        color="success"
        disabled={loadingInscriptos}
        onClick={handleExport}
      >
        Filtrar
      </Button>
    </Container>
  );
}

