import React from "react";
import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-dev-runtime";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;