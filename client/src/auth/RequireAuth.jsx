import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function RequireAuth({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser?.uid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
