import Cookies from "js-cookie";

interface Credentials {
  user_name: string;
  user_password: string;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const login = async (credentials: Credentials): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include", //? Asegura que las cookies se manejen automáticamente
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error("Login failed");
    }

    const data = await response.json();
    if (data.token) {
      Cookies.set("user", data.token, { expires: 7 }); //? Guardar token en cookies por 7 días
      console.log('tokenAuth', data.token)
    } else {
      console.error("Token not found in response:", data);
    }
    return true; // Login exitoso
  } catch (error) {
    console.error(error);
    return false; // Login fallido
  }
};

export const isAuthenticated = () => {
  return Cookies.get("user") !== undefined; //? Verifica si la cookie 'user' está presente
};

export const logout = () => {
  Cookies.remove("user"); //? Elimina la cookie de autenticación
};
