import { createContext, useContext, useMemo, useState } from "react";
import { signIn as apiSignIn, signUp as apiSignUp } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");
    try {
      return userInfo ? JSON.parse(userInfo) : null;
    } catch {
      return null;
    }
  });
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const login = async ({ login: userLogin, password }) => {
    setIsAuthLoading(true);
    try {
      const response = await apiSignIn({ login: userLogin, password });
      const authToken = response.token || response.user?.token;
      const userData = response.user || response;
      
      if (!authToken) throw new Error("Не получен токен");
      
      setToken(authToken);
      setUser(userData);
      localStorage.setItem("token", authToken);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Ошибка входа:", error);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const register = async ({ name, login: userLogin, password }) => {
    setIsAuthLoading(true);
    try {
      const response = await apiSignUp({ name, login: userLogin, password });
      const authToken = response.token || response.user?.token;
      const userData = response.user || response;
      
      if (!authToken) throw new Error("Не получен токен");
      
      setToken(authToken);
      setUser(userData);
      localStorage.setItem("token", authToken);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  };

  const isAuth = Boolean(token && user);

  const value = useMemo(
    () => ({ user, token, isAuth, isAuthLoading, login, register, logout }),
    [user, token, isAuth, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}