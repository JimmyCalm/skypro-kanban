import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";
import PopBrowsePage from "../pages/PopBrowsePage";
import PopNewCardPage from "../pages/PopNewCardPage";
import Layout from "./Layout";

function ProtectedRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state && state.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<MainPage setIsAuth={setIsAuth} />} />
          <Route path="/card/:id" element={<PopBrowsePage />} />
          <Route path="/new" element={<PopNewCardPage />} />
          <Route path="/exit" element={<ExitPage setIsAuth={setIsAuth} />} />
        </Route>
        <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/card/:id" element={<PopBrowsePage />} />
            <Route path="/new" element={<PopNewCardPage />} />
            <Route path="/exit" element={<ExitPage setIsAuth={setIsAuth} />} />
          </Route>
        </Routes>
      )}
    </>
  );
}
