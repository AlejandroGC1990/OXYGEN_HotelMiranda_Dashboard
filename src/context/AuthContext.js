import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginService,
  logout as logoutService,
  isAuthenticated,
} from "../utils/auth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//? Crear el contexto de autenticación
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const navigate = useNavigate();

  //? Manjear el login
  const login = (credencials) => {
    if (loginService(credencials)) {
      setIsLoggedIn(true);
      navigate("/"); //? redirige al dashboard tras el login
    } else {
      setIsLoggedIn(false);
    }
  };

  //? Manejar el logout
  const logout = () => {
    logoutService();
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    //? Verificar si el usuario ya está autenticado al cargar la página
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
