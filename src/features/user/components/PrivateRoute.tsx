import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface Props {
  children: React.ReactNode;
}

interface TokenPayload {
  exp: number;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("jwt_token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const isValid = decoded.exp > Date.now() / 1000;
    return isValid ? <>{children}</> : <Navigate to="/login" />;
  } catch {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
