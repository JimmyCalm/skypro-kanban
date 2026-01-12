import { ErrorText } from "./AuthForm.styled";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AuthBg,
  AuthModal,
  AuthWrapper,
  AuthTitle,
  AuthFormstyle,
  InputWrapper,
  AuthInput,
  ButtonEnter,
  FormGroup,
} from "./AuthForm.styled.js";
import { GlobalStyles } from "../../styles/GlobalStyles.styled.js";
import { useAuth } from "../../contexts/AuthContext";

function AuthForm({ isSignUp }) {
  const navigate = useNavigate();
  const { login, register, isAuthLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    login: false,
    password: false,
  });
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const error = localError;

  const validateForm = () => {
    const newErrors = {
      name: isSignUp && !formData.name.trim(),
      login: !formData.login.trim(),
      password: !formData.password.trim(),
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.login || newErrors.password) {
      setLocalError("Заполните все обязательные поля");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
    if (error) setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (isAuthLoading || isSubmitting) return;

    setIsSubmitting(true);
    setLocalError("");

    try {
      if (isSignUp) {
        await register(formData);
      } else {
        await login({ login: formData.login, password: formData.password });
      }
      navigate("/");
    } catch (err) {
      setLocalError(
        err.message ||
          (isSignUp ? "Ошибка при регистрации" : "Ошибка при входе")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    isSubmitting ||
    isAuthLoading ||
    !formData.login.trim() ||
    !formData.password.trim() ||
    (isSignUp && !formData.name.trim());

  return (
    <>
      <GlobalStyles />
      <AuthBg>
        <AuthModal $isSignUp={isSignUp}>
          <AuthWrapper>
            <AuthTitle>{isSignUp ? "Регистрация" : "Вход"}</AuthTitle>
            <AuthFormstyle onSubmit={handleSubmit}>
              <InputWrapper>
                {isSignUp && (
                  <AuthInput
                    $error={errors.name}
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting || isAuthLoading}
                  />
                )}
                <AuthInput
                  $error={errors.login}
                  type="text"
                  name="login"
                  placeholder="Эл. почта"
                  value={formData.login}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={isSubmitting || isAuthLoading}
                />
                <AuthInput
                  $error={errors.password}
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting || isAuthLoading}
                />
              </InputWrapper>

              {error && <ErrorText>{error}</ErrorText>}

              <ButtonEnter
                type="submit"
                disabled={isSubmitDisabled}
                style={{
                  backgroundColor: isSubmitDisabled ? "#94A6BE" : "#565EEF",
                  color: "#ffffff",
                  cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting || isAuthLoading
                  ? "Загрузка..."
                  : isSignUp
                  ? "Зарегистрироваться"
                  : "Войти"}
              </ButtonEnter>

              <FormGroup $isSignUp={isSignUp}>
                <p>
                  {isSignUp ? "Уже есть аккаунт?" : "Нужно зарегистрироваться?"}
                </p>
                <Link to={isSignUp ? "/login" : "/register"}>
                  {isSignUp ? "Войдите здесь" : "Регистрируйтесь здесь"}
                </Link>
              </FormGroup>
            </AuthFormstyle>
          </AuthWrapper>
        </AuthModal>
      </AuthBg>
    </>
  );
}

export default AuthForm;