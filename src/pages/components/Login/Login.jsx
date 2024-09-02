import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { login } from "../../../utils/auth";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;

const Login = ({ onClose }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(credentials)) {
      onClose(); 
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Iniciar Sesión</Title>
        {error && <Error>{error}</Error>}
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Usuario:</Label>
            <Input type="text" name="username" onChange={handleChange} required />
          </div>
          <div>
            <Label>Contraseña:</Label>
            <Input type="password" name="password" onChange={handleChange} required />
          </div>
          <Button type="submit">Iniciar Sesión</Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Login;
