import { useContext, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { AcordeContext } from "../context/AcordeContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  // const { getAuth, authenticated, loading,rolesPersona } = useStore();
  const { getAuth, authenticated, loading,logout} = useContext(AcordeContext);

  useEffect(() => {
    getAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : authenticated ? (
    children
  ) : (
  <Navigate to="/login" />
  // <></>
  // logout()
  );
};

export default PrivateRoute;
