import { createContext, useEffect, useReducer, ReactNode, FC } from "react";
import {
  login as loginService,
  logout as logoutService,
  isAuthenticated,
} from "../utils/auth";
import { authReducer } from "./authReducer";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

//? Interfaz de credenciales
interface Credentials {
  user_name: string;
  user_password: string;
}

//? Estado de autenticación
interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
}

//? Interfaz del contexto de autenticación
export interface AuthContextType extends AuthState {
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

//? Props del proveedor de autenticación
interface AuthProviderProps {
  children: ReactNode;
}

//? Crear el contexto de autenticación
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

//? Estado inicial de autenticación
const initialState: AuthState = {
  isLoggedIn: isAuthenticated(),
  user: Cookies.get("user") || null,
};

//? Componente AuthProvider
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  //? Manejar el login
  const login = async (credentials: Credentials) => {
    const isLoggedIn = await loginService(credentials);

    if (isLoggedIn) {
      dispatch({ type: "LOGIN", payload: credentials.user_name });
      navigate("/"); //? Redirige al dashboard tras el login
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
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};