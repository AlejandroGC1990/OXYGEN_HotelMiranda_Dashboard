import { useContext } from "react";
import { AuthContext } from "./AuthContext";

//? Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext)
};