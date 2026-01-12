import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CardPage from "../pages/CardPage";
import NewCardPage from "../pages/NewCardPage";
import ExitPage from "../pages/ExitPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />}>
          <Route path="new-card" element={<NewCardPage />} />
          <Route path="/card/:id" element={<CardPage />} />
        </Route>
        <Route path="/exit" element={<ExitPage />} />
      </Route>
      <Route path="/login" element={<SignInPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;