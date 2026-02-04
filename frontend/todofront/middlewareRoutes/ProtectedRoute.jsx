import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {
  const token=localStorage.getItem("todo_token");
  return (token)? children : <Navigate to="/" replace/>;
}

export default ProtectedRoute;
