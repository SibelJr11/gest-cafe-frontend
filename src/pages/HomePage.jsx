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
    <div className="drawer-content flex flex-col">
       {/* Navbar */}
       <div className="fixed top-0 left-0 right-0 bg-white shadow-md h-16">
          <Navbar />
        </div>

        {/* Contenido de la página */}
        <div className="flex-grow px-4 py-6 bg-gray-300 overflow-auto mt-16">
          <Routes>
            <Route path="table-gestion" element={<TableGestion />} />
            <Route path="table-sales" element={<TableGestionSales />}/> 
            <Route path="farms-details" element={<FarmsDetailsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="payment-history" element={<PaymentHistoryPage />} />
            <Route path="coffee-news" element={<CoffeeNewsPage />} />
          </Routes>
        </div>
    </div>
    {/* Sidebar */}
      <Sidebar/>
  </div>
  
  );
};

export default HomePage;

