import { createContext, useEffect, useReducer } from "react";
import {
  login as loginService,
  logout as logoutService,
  isAuthenticated,
} from "../utils/auth";
import { authReducer } from "./authReducer";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//? Crear el contexto de autenticación
export const AuthContext = createContext();

//? Estado inicial de autenticación
const initialState = {
  isLoggedIn: isAuthenticated(),
  user: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  //? Manjear el login
  const login = (credentials) => {
    if (loginService(credentials)) {
      dispatch({ type: "LOGIN", payload: credentials.username });
      navigate("/"); //? redirige al dashboard tras el login
    }
  };

  //? Manejar el logout
  const logout = () => {
    logoutService();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    //? Verificar si el usuario ya está autenticado al cargar la página
    if (isAuthenticated()) {
      dispatch({ type: "LOGIN", payload: localStorage.getItem("user") });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
