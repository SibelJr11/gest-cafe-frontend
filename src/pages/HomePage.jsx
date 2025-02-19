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
    <div className="drawer lg:drawer-open ">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
       {/* Navbar */}
       <div >

          <Navbar />
        </div>

        {/* Contenido de la página */}
        <div className="flex-grow p-4 bg-gray-300 overflow-auto h-full">
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

