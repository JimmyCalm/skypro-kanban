import styled from "styled-components";
import { GlobalStyles } from "../Styles/GlobalStyles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/auth";

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`;

const LoginForm = styled.form`
  background-color: #ffffff;
  max-width: 368px;
  max-height: 329px;
  padding: 50px 60px 50px 60px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #33399b;
  }
`;

const LoginDescription = styled.p`
  margin: 10px 0;
  color: #94a6be66;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function LoginPage({ setIsAuth }) {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await loginUser({ login, password });
      
      localStorage.setItem("token", userData.token);
      
      if (setIsAuth) {
        setIsAuth(true);
      }
      
      navigate("/");
    } catch (err) {
      
      setError(
        err.message || "Ошибка авторизации. Проверьте логин и пароль."
      );
    }
  };

  return (
    <LoginWrapper>
      <GlobalStyles />
      <LoginForm onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <LoginInput type="text" placeholder="Эл.почта" value={login} onChange={(e) => setLogin(e.target.value)}/>
        <LoginInput type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        <LoginButton type="submit">Войти</LoginButton>
        <LoginDescription>
          Нужно зарегистрироваться?{" "}
          <Link to="/register">Регистрируйтесь здесь</Link>
        </LoginDescription>
      </LoginForm>
    </LoginWrapper>
  );
}
