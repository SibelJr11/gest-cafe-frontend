import HomeLayout from "../layouts/HomeLayout";
import LoginPage from "../pages/LoginPage";
import UserRegisterPage from "../pages/UserRegisterPage";
import FarmRegisterPage from "../pages/FarmRegisterPage";
import FarmsPage from "../pages/FarmsPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import NotFoundPage from "../pages/NotFoundPage"; // Nueva página 404
import HomeRoutes from "./HomeRoutes"
import HomePage from "../pages/HomePage";
import PlanesPage from "../pages/PlanesPage";
import CPanelPage from "../pages/CPanelPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const AppRoutes = [
      { path: "/", element: <LoginPage />, isPublic: true },
      { path: "/cpanel", element: <CPanelPage />, isPublic: true },
      { path: "/reset-password", element: <ResetPasswordPage />, isPublic: true },
      { path: "/register-user", element: <UserRegisterPage />, isPublic: true },
      { path: "/register-farm", element: <FarmRegisterPage />, isPublic: true },
      { path: "/farms", element: <FarmsPage />, role: ["ADMINISTRADOR", "PROPIETARIO"] }, // Solo admin y propietario
      { path: "/unauthorized", element: <UnauthorizedPage />, isPublic: true },
      { path: "*", element: <NotFoundPage />, isPublic: true }, // Página 404


      // 🔥 Rutas de Home con subrutas protegidas
      {
        path: "/home/*",
        element: <HomeLayout />, // Usamos HomeLayout como contenedor
        role: ["ADMINISTRADOR", "PROPIETARIO"], // Protegemos el acceso
        children: [
          { index: true, element: <HomePage /> }, // Página principal en /home
          ...HomeRoutes, // Subrutas dentro de /home/*
        ],
      },
];

export default AppRoutes;
