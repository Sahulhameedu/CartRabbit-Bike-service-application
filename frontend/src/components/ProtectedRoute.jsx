import React from "react";
import { Navigate,  } from "react-router-dom";
import useAuth from "../hooks/useAuth";


// Protect customer and owner route based on rolebased

const ProtectedRoute = ({ role, children }) => {
  const { token, role: userRole } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role !== userRole) {
    // Redirect to the appropriate dashboard if roles don’t match
    return (
      <Navigate to={userRole === "customer" ? "/customer" : "/owner"} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
