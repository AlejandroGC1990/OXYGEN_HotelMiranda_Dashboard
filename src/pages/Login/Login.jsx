import { useState } from "react";
import "./__login.scss";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const {login, isLogedIn} = useAuth(); //?Obtener login y el estado isLoggedIn del contexto 

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(credentials)) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalOverlay__content">
        <h2 className="modalOverlay__content__title">Iniciar Sesión</h2>

        {error && <div className="modalOverlay__content__error">{error}</div>}
        <form className="modalOverlay__content__form" onSubmit={handleSubmit}>
          <div>
            <label className="modalOverlay__content__label">Usuario:</label>
            <input
              className="modalOverlay__content__input"
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="modalOverlay__content__label">Contraseña:</label>
            <input
              className="modalOverlay__content__input"
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
            <button
              className="modalOverlay__content__form__button"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
