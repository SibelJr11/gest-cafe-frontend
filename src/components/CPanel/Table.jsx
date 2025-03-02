import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, CreditCardIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { formatearFecha } from '../../utils/formatter';
import  SearchInput from "./SearchInput";

const Table = ({ allUsuarios,activarPlanSuscripcion,abrirModalHistorialPagos}) => {
 const [paginaActual, setPaginaActual] = useState(1);
       const usuariosPorPagina = 5;
 
       // Calcular los índices de los elementos a mostrar
       const indiceUltimoElemento = paginaActual * usuariosPorPagina;10
       const indicePrimerElemento = indiceUltimoElemento - usuariosPorPagina;
       const elementosActuales = allUsuarios.slice(indicePrimerElemento, indiceUltimoElemento);
     
       // Cambiar de página
       const totalPaginas = Math.ceil(allUsuarios.length / usuariosPorPagina);
     
       const irAPaginaSiguiente = () => {
         if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
       };
     
       const irAPaginaAnterior = () => {
         if (paginaActual > 1) setPaginaActual(paginaActual - 1);
       };

       const getEstadoSuscripcion = (estado) => {
        switch (estado) {
              case "ACTIVO":
                return "bg-[#2E7D32] text-[#F4E3C0]"; // Verde profesional con texto beige crema
              case "ESPERA":
                return "bg-[#eff170] text-[#1B1B1B]"; // Beige suave con texto gris profesional
              case "SUSPENDIDO":
                return "bg-[#732626] text-[#F4E3C0]"; // Negro sofisticado con texto beige crema
              default:
                return "bg-gray-200 text-gray-800"; // Opción por defecto sutil y neutra
            }
            
    };
    

    return (
        <>
        
        <div className="overflow-x-scroll sm:overflow-x-scroll">                      
        <div className="table table-auto size-full border-separate border-spacing-0 table-sm sm:table-sm md:table-sm lg:table-md ">
             <thead className="bg-[#1A4D2E] text-xs md:text-sm text-[#E0D2B8] text-semibold">
                        <th>Nombre</th>
                        <th>Tipo Usuario</th>
                        <th>Celular</th>
                        <th>Correo</th>
                        <th>Plan</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Supensión</th>
                        <th>Suscripcion</th>
                        <th className="w-auto">Opciones</th>

                </thead>
                <tbody className="text-[#3F3F3F]">
                    {elementosActuales.map((user) => (
                        <tr key={user.no_identificacion} >
                            <td className="text-xs md:text-sm font-bold border-b border-gray-300">                               
                                {user.nombres +" "+user.apellidos}
                            </td>
                            <td className="text-xs md:text-sm border-b border-gray-300 ">{user.rol}</td>
                            <td className="text-xs md:text-sm border-b border-gray-300">{user.celular}</td>
                            <td className="text-xs md:text-sm border-b border-gray-300">{user.correo}</td>
                            <td className="text-xs md:text-sm border-b border-gray-300">{user.plan}</td>
                            <td className="text-xs md:text-sm border-b border-gray-300">{formatearFecha(user.fecha_inicio)}</td>
                            <td className="text-xs md:text-sm border-b border-gray-300">{formatearFecha(user.fecha_suspension)}</td>
                            <td className="text-center border-b border-gray-300 ">
                                    <div className={`badge badge-sm text-xs xs:w-full md:badge-lg md:text-sm py-4 font-semibold border-none ${getEstadoSuscripcion(user.estado)}`} >
                                       {user.estado}
                                    </div>         
                                  </td>  
                            <td className="h-auto grid grid-cols-2 md:flex md:flex-row gap-2 border-b border-gray-300 w-auto min-w-max">                                        
                              <button className="btn btn-sm text-xs lg:btn-md flex items-center gap-1 bg-[#1A4D2E] text-[#F4E3C0] border-none" onClick={()=>activarPlanSuscripcion(user.id_suscripcion)} disable={user.estado === "ACTIVO"}>
                                <CheckCircleIcon className="h-5 w-5" /> Activar
                              </button> 
                              <button className="btn btn-sm text-xs lg:btn-md flex items-center gap-1 bg-[#1A4D2E] text-[#F4E3C0] border-none" onClick={()=>abrirModalHistorialPagos(user.id_suscripcion)}>
                                <CreditCardIcon className="h-5 w-5" /> Ver pagos
                              </button>                   
                         </td>
                        </tr>
                    ))}
                </tbody>
            </div>
        </div>

      <div className="flex justify-between items-center  mt-4 w-full  text-xs md:text-sm text-[#1B1B1B] " >
      <div>
         <span >
           Usuarios: {allUsuarios.length}
         </span>
      </div>
      
       <div className='flex  items-center gap-3'>
      <span>
       Página {paginaActual} de {totalPaginas}
      </span>
      <button
       className="btn btn-xs md:btn-sm bg-[#1A4D2E] text-[#F4E3C0] border-none flex items-center"
       disabled={paginaActual === 1}
       onClick={irAPaginaAnterior}
      >
        <ChevronLeftIcon className="w-3 md:w-4" />
      </button>
      
      <button
        className="btn btn-xs md:btn-sm bg-[#1A4D2E] text-[#F4E3C0] border-none flex items-center"
       disabled={paginaActual === totalPaginas}
       onClick={irAPaginaSiguiente}
      >
       <ChevronRightIcon className="w-3 md:w-4" />
      </button>
       </div>  
      </div> 
      </> 
    );
};

export default Table;