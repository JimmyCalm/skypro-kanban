import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CardPage from '../pages/CardPage';
import NewCardPage from '../pages/NewCardPage';
import ExitPage from '../pages/ExitPage';
import NotFoundPage from '../pages/NotFoundPage';
import { useState } from 'react';

const ProtectedRoute = ({ children, isAuth }) => {
  console.log('ProtectedRoute isAuth:', isAuth);
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = () => {
    console.log('handleLogin called, setting isAuth to true');
    setIsAuth(true);
  };
  const handleLogout = () => setIsAuth(false);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/card/:id"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <CardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-card"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <NewCardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exit"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <ExitPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}