import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { status } = useContext(AuthContext);

  if (status === "INIT") return <div>Loading...</div>;
  
  if (status === "UNAUTHENTICATED") {
    return <Navigate to="/auth" replace />;
  }

  if (status === "AUTH_UNVERIFIED") {
    return <Navigate to="/verify-notice" replace />;
  }
  return children;
};

export default ProtectedRoute;
