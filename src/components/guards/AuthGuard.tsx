import * as React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

interface AuthGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by authenticated users
const AuthGuard = ({ children }: AuthGuardType) => {
  const { isAuthenticated, isInitialized } = useAuth();

  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
