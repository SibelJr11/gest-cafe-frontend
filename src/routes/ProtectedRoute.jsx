import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "./AppRoutes";

const ProtectedRoute = () => {
      const auth = useSelector((state) => state.auth);
      const location = useLocation();

      // Si no está autenticado, redirigir al login
      if (!auth.usuario || !auth.token) {
            return <Navigate to="/" />;
      }

      // Buscar la ruta actual en la lista de rutas protegidas
      const currentRoute = routes.find((route) => route.path === location.pathname);

      // Si la ruta requiere roles específicos y el usuario no tiene uno válido, redirigir
      if (currentRoute?.role && !currentRoute.role.includes(auth.usuario.rol)) {
            return <Navigate to="/unauthorized" />;
      }

      return <Outlet />; // Si tiene acceso, renderiza la ruta
};

export default ProtectedRoute;
