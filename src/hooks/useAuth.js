import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//? Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext)
};