import { GlobeAltIcon } from "@heroicons/react/24/solid";
import React from "react";
import FacebookNews from "../components/FacebookNews";

const CoffeeNewsPage = () => {
  return (
    <div className="card w-auto shadow-xl bg-white p-6  min-h-screen">
     
        {/* Encabezado */}
        <div className="flex items-center space-x-3 border-b pb-3">
          <GlobeAltIcon className="text-[#2E7D32] h-8 w-8" />
          <h2 className="text-lg md:text-2xl font-semibold text-[#1B1B1B]">Últimas Noticias del Café</h2>
        </div>


        {/* Contenedor del iframe */}
        <div className="mt-4 h-36 flex justify-center">
          <FacebookNews/>
        </div>


    
    
    </div>
  );
};

export default CoffeeNewsPage;
