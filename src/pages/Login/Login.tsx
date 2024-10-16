import { useState, ChangeEvent, FormEvent } from "react";
import "./__login.scss";
import { useAuth } from "../../hooks/useAuth";

interface Credentials {
  user_name: string;
  user_password: string;
}

const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    user_name: "",
    user_password: "",
  });
  const [error, setError] = useState<string>(""); //? Estado para manejar el error con tipo string
  const {login, isLoggedIn } = useAuth(); //? Obtener login y el estado isLoggedIn del contexto 

  //? Manejar el cambio en los inputs, con el tipo de evento ChangeEvent<HTMLInputElement>
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  //? Manejar el envío del formulario, con el tipo de evento FormEvent<HTMLFormElement>
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(credentials);
    } catch (err) {
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
              name="user_name"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="modalOverlay__content__label">Contraseña:</label>
            <input
              className="modalOverlay__content__input"
              type="password"
              name="user_password"
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
