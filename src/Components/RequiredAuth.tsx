import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function RequireAuth({ children }: { children: React.ReactElement }) {
  const loc = useLocation();
  if (!isLoggedIn()) {
    return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname + loc.search)}`} replace />;
  }
  return children;
}
