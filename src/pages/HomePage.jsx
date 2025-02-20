import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TableGestion from "../components/TableGestion/Index";
import TableGestionSales from "../components/CoffeeSalesControl/Index";
import AnalyticsPage from "./AnalyticsPage";
import FarmsDetailsPage from "./FarmsDetailsPage";
import { Route, Routes } from "react-router-dom";
import PaymentHistoryPage from "./PaymentHistoryPage";
import CoffeeNewsPage from "./CoffeeNewsPage";

const HomePage = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen">
        <Navbar />

        {/* Contenedor de Rutas sin afectar estilos */}
        <div className="p-4 bg-gray-300 overflow-auto h-[calc(100vh-64px)]">
          <Routes>
            <Route path="table-gestion" element={<TableGestion />} />
            <Route path="table-sales" element={<TableGestionSales />} />
            <Route path="farms-details" element={<FarmsDetailsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="payment-history" element={<PaymentHistoryPage />} />
            <Route path="coffee-news" element={<CoffeeNewsPage />} />
          </Routes>

          {/* Footer Siempre al Final sin afectar estilos */}
          <footer className="text-[#1B1B1B] text-center text-xs py-2 mt-4 ">
            <div className="container mx-auto px-4">
              <p className="uppercase tracking-wide font-semibold">
                © {new Date().getFullYear()} GestCafé
              </p>
              <p className="text-[#3F3F3F]">
                Desarrollado por <span className="text-black text-sm font-semibold">Sibel Dev 11</span>
              </p>
              <p className="text-[#5E5E5E] text-xs">Hecho con ❤️ en Colombia</p>
            </div>
          </footer>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default HomePage;
