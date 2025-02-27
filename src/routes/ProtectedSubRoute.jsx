import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedSubRoute = ({ allowedRoles, children }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.usuario || !auth.token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.usuario.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("✅ Usuario autorizado, renderizando componente...");

  return children; // 👈 En lugar de Outlet, renderiza el componente directamente
};

export default ProtectedSubRoute;
