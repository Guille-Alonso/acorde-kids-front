import { createContext, useState } from "react";
import axios from "../config/axios";

export const AcordeContext = createContext();

// eslint-disable-next-line react/prop-types
const ProviderAcorde = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [botonState, setBotonState] = useState(false);
  const [errors, setErrors] = useState("");

  const logout = () => {
    localStorage.clear();
    setAuthenticated(false);
  }

const login = async (values) => {
    setBotonState(true);
    try {
        setErrors("");
        const { data } = await axios.post("/usuarios/login", values);
        setAuthenticated(!!data.user);
        setUser(data.user);
        axios.defaults.headers.common["Authorization"] = data.token;
        localStorage.setItem("token", data.token);
    } catch (error) {
        setErrors(error.response.data?.errors?.length > 0 ?  error.response.data.errors[0].msg : error.response?.data?.message? error.response?.data.message: error.message);
    }
    setBotonState(false);
}

  const getAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setAuthenticated(false);
        // return logout();
      }
      
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get("/usuarios/authStatus");
      setUser(data.user);

      setAuthenticated(true);
    } catch (error) {
      setAuthenticated(false);
      // logout();
      localStorage.removeItem("token");
      console.log("error de auth");
    }
    setLoading(false);
  };

  return (
    <AcordeContext.Provider
      value={{
        user,
        authenticated,
        setAuthenticated,
        loading,
        getAuth,
        setLoading,
        logout,
        login,
        errors,
        setErrors,
        botonState
      }}
    >
      {children}
    </AcordeContext.Provider>
  );
};

export default ProviderAcorde;