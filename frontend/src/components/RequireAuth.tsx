import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
  }

  export default RequireAuth;