import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FormularioInicial from './components/FormularioInicial'
import PreInscripcionExitosa from './pages/PreInscripcionExitosa'
import ListarPreInscriptos from './pages/ListarPreInscriptos'
import Inscripcion from './components/Inscripcion'
import ListarInscriptos from './pages/ListarInscriptos'
import EditarInscripcionAlumno from './components/EditarInscripcionAlumno'
import ProviderAcorde from './context/AcordeContext'
import Layout from './common/Layout'
import Login from './components/Login'
import PrivateRoute from './routes/PrivateRoute'
import Admin from './pages/Admin'
import HomeKids from './pages/HomeKids'
import InscripcionKids from './components/InscripcionKids'

function App() {

  return (
    <>
      <HashRouter>
        <ProviderAcorde>
          <Routes>
            <Route element={<Layout />}>
              <Route
                exact
                path="/listarPreInscriptos"
                element={<PrivateRoute key="pre"><ListarPreInscriptos /></PrivateRoute>}
              />
              <Route
                exact
                path="/listarInscriptos"
                element={<PrivateRoute key="insc"><ListarInscriptos /></PrivateRoute>}
              />
              <Route
                exact
                path="/editarInscripciones"
                element={<PrivateRoute key="editarInsc"><EditarInscripcionAlumno /></PrivateRoute>}
              />
              
              <Route exact path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />

            </Route>
            <Route exact path="/login" element={<Login />} />
            {/* <Route exact path="/*" element={<Home />} /> */}
            <Route exact path="/*" element={<HomeKids />} />
            <Route exact path="/formInicial" element={<Inscripcion />} />
            <Route exact path="/formInicialKids" element={<InscripcionKids />} />
            <Route
              exact
              path="/preinscripcionExitosa"
              element={<PreInscripcionExitosa />}
            />
          </Routes>
        </ProviderAcorde>
      </HashRouter>
    </>
  );
}

export default App
