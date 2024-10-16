import { useContext } from "react";
import { AuthContext, AuthContextType  } from "../context/AuthContext";

//? Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};