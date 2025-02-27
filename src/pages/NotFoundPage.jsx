import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-[#1B1B1B]">404</h1>
      <p className="text-lg md:text-xl text-[#3F3F3F] mt-2">Página no encontrada</p>
      <p className="text-sm md:text-lg text-[#5E5E5E] mt-1">Lo sentimos, la página que buscas no existe.</p>
      
      <div className="mt-6">
        <Link
          to="/home"
          className="px-3 py-2 md:px-5 md:py-3 bg-[#1A4D2E] text-white text-sm md:font-medium rounded-lg shadow-md hover:bg-[#2E7D32] transition duration-300 inline-block"
        >
           Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
