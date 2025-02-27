import React from "react";
import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-6">
      <LockClosedIcon className="w-16 h-16 text-red-600 mb-4" /> 
        <h1 className="text-3xl md:text-4xl font-bold text-[#1B1B1B]">
           Acceso Denegado
        </h1>
        <p className="text-lg md:text-xl text-[#3F3F3F] mt-4 text-center">
          No tienes los permisos necesarios para ver esta página.
        </p>
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

export default UnauthorizedPage;
