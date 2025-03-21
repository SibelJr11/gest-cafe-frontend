import React from 'react';
import { ChartBarIcon, HomeIcon, CurrencyDollarIcon, PresentationChartLineIcon, BuildingStorefrontIcon, TagIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const usuario = useSelector((state) => state.auth.usuario);
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-[#1A4D2E]  min-h-full w-56 md:w-60 flex flex-col items-start text-[#F4E3C0] "> 
     
      <li className="w-full">
          <Link to='/home' className="flex items-center justify-start p-4 hover:bg-[#2E7D32] transition-colors duration-300  w-full">
             <HomeIcon className="h-7 w-7 text-[#F4E3C0]" />
            <span className="inline-block ml-3 text-sm font-medium">Inicio</span>
          </Link>
        </li>
        <li className="w-full">
          <Link to='/home/table-gestion' className="flex items-center justify-start p-4 hover:bg-[#2E7D32] transition-colors duration-300  w-full">
            <PresentationChartLineIcon className="h-7 w-7 text-[#F4E3C0]" />
            <span className="inline-block ml-3 text-sm font-medium">Gestión diaria</span>
          </Link>
        </li>
        <li className="w-full">
          <Link to='/home/table-sales' className="flex items-center justify-start p-4 hover:bg-[#2E7D32] transition-colors duration-300  w-full">
            <TagIcon className="h-7 w-7 text-[#F4E3C0]" />
            <span className="inline-block ml-3 text-sm font-medium">Producción de café</span>
          </Link>
        </li>
        <li className="w-full">
          <Link to='/home/payment-history' className="flex items-center justify-start p-4 hover:bg-[#2E7D32] transition-colors duration-300  w-full">
            <CurrencyDollarIcon className="h-7 w-7 text-[#F4E3C0]" />
            <span className="inline-block ml-3 text-sm font-medium">Historial de Pagos</span>
          </Link>
        </li>

         {usuario.rol === 'PROPIETARIO' ? (
         <li className="w-full">
          <Link to='/home/farms-details' className="flex items-center justify-start p-4 hover:bg-[#2E7D32] transition-colors duration-300  w-full">
            <BuildingStorefrontIcon className="h-7 w-7 text-[#F4E3C0]" />
            <span className="inline-block ml-3 text-sm font-medium">Mis Fincas</span>
          </Link>
        </li>
        ) : null }
        <li className="w-full">
          <Link to='/home/analytics' className="flex items-center justify-start p-4 hover:bg-[#2E7D32] transition-colors duration-300  w-full">
            <ChartBarIcon className="h-7 w-7 text-[#F4E3C0]" />
            <span className="inline-block ml-3 text-sm font-medium">Gráficos / Estadísticas</span>
          </Link>
        </li>

    { /*   <li className="w-full">
          <Link to='/home/coffee-news' className="flex items-center justify-start p-4 hover:bg-[#2E7D32] transition-colors duration-300  w-full">
            <TagIcon className="h-7 w-7 text-[#F4E3C0]" />
            <span className="inline-block ml-3 text-sm font-medium">Noticias del Café</span>
          </Link>
        </li>
*/}
      </ul>
    </div>
  );
};

export default Sidebar;