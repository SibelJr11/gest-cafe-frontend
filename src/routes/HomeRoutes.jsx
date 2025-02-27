import TableGestion from "../components/TableGestion/Index";
import TableGestionSales from "../components/CoffeeSalesControl/Index";
import AnalyticsPage from "../pages/AnalyticsPage";
import FarmsDetailsPage from "../pages/FarmsDetailsPage";
import PaymentHistoryPage from "../pages/PaymentHistoryPage";
import CoffeeNewsPage from "../pages/CoffeeNewsPage";
import ProtectedSubRoute from "./ProtectedSubRoute"; // Protegemos farms-details
import NotFoundPage from "../pages/NotFoundPage"; // Nueva página 404

const HomeRoutes = [
  { path: "table-gestion", element: <TableGestion /> },
  { path: "table-sales", element: <TableGestionSales /> },
  { path: "analytics", element: <AnalyticsPage /> },
  { path: "payment-history", element: <PaymentHistoryPage /> },
  { path: "coffee-news", element: <CoffeeNewsPage /> },
  { path: "*", element: <NotFoundPage />, }, // Página 404

  // 🔥 Esta subruta solo permite propietarios
  {
    path: "farms-details",
    element: (
      <ProtectedSubRoute allowedRoles={["PROPIETARIO"]}>
        <FarmsDetailsPage /> {/* 👈 Aquí directamente, sin children */}
      </ProtectedSubRoute>
    ),
  },
];

export default HomeRoutes;
