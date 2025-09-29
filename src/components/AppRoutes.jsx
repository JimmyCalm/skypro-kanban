import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";
import PopBrowse from "../components/popups/PopBrowse";
import PopNewCardPage from "../pages/PopNewCardPage";
import Layout from "./Layout";

function ProtectedRoute({ children }) {
  const { isAuth, isLoading } = useContext(AuthContext);
  

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  
  return isAuth ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuth, isLoading } = useContext(AuthContext);
  
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  
  return !isAuth ? children : <Navigate to="/" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<MainPage />}>
          <Route path="card/:id" element={<PopBrowse />} />
          <Route path="new" element={<PopNewCardPage />} />
          <Route path="exit" element={<ExitPage />} />
        </Route>
      </Route>
      
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } 
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}