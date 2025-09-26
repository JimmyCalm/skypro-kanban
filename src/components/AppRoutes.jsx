import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";
import PopBrowse from "../components/popups/PopBrowse";
import PopNewCardPage from "../pages/PopNewCardPage";
import Layout from "./Layout";

function ProtectedRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("userInfo"));

  useEffect(() => {
    const checkAuth = () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setIsAuth(!!userInfo?.token);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Layout setIsAuth={setIsAuth} />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<MainPage setIsAuth={setIsAuth} />}>
          <Route path="card/:id" element={<PopBrowse />} />
          <Route path="new" element={<PopNewCardPage />} />
          <Route path="exit" element={<ExitPage setIsAuth={setIsAuth} />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
      <Route path="/register" element={<RegisterPage setIsAuth={setIsAuth} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}