import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen">
        <Navbar />
        {/* 🔄 Outlet renderiza la subruta correspondiente según la URL */}
        <div className="flex flex-col flex-grow p-3 md:p-4 bg-gray-200 overflow-auto h-[calc(100vh-64px)]">
           <div className="flex-grow">
             <Outlet /> {/* Aquí se renderiza el contenido dinámico */}
           </div>
           <Footer />
        </div>

      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default HomeLayout;
