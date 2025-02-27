import React, { useState } from 'react'
import { convertirAPesosColombiano, formatearSoloFecha } from '../../utils/formatter';
import {ChevronLeftIcon,ChevronRightIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

const Table = ({ventas,abrirModalVenta}) => {
      const [paginaActual, setPaginaActual] = useState(1);
      const empleadosPorPagina = 5;

      // Calcular los índices de los elementos a mostrar
      const indiceUltimoElemento = paginaActual * empleadosPorPagina;10
      const indicePrimerElemento = indiceUltimoElemento - empleadosPorPagina;
      const elementosActuales = ventas.slice(indicePrimerElemento, indiceUltimoElemento);
    
      // Cambiar de página
      const totalPaginas = Math.ceil(ventas.length / empleadosPorPagina);
    
      const irAPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
      };
    
      const irAPaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
      };

      const getCafeClass = (tipoCafe) => {
            switch (tipoCafe) {
                  case "CAFÉ VERDE":
                    return "bg-[#2E7D32] text-[#F4E3C0]"; // Verde profesional con texto beige crema
                  case "CAFÉ SECO":
                    return "bg-[#eff170] text-[#1B1B1B]"; // Beige suave con texto gris profesional
                  case "PASILLA":
                    return "bg-[#553a07fb] text-[#F4E3C0]"; // Negro sofisticado con texto beige crema
                  default:
                    return "bg-gray-200 text-gray-800"; // Opción por defecto sutil y neutra
                }
                
        };

        const calcularCargas=(kilos) =>{
            const kilosPorCarga = 125;
            return Math.round(kilos / kilosPorCarga);  // Redondear al número entero más cercano
        }
        
  return (
    <div>
    <div className="overflow-x-scroll sm:overflow-x-scroll">                      
     <div className="table table-auto size-full border-separate border-spacing-0 table-sm sm:table-sm md:table-sm lg:table-md ">
          <thead className="bg-[#1A4D2E] text-xs md:text-sm text-[#E0D2B8] text-semibold">
                <th>Fecha</th>
                <th>Kilos</th>
                <th>Cargas</th>
                <th>Precio</th>
                <th>Tipo de café</th>
                <th className='w-auto'>Opciones</th>
               
          </thead>
          <tbody className="text-[#3F3F3F]">
                {elementosActuales.map((e) => (
                      <>
                            <tr key={e.id_venta}>
                                  <th className="w-auto border-b font-semibold border-gray-300 text-xs md:text-sm">{formatearSoloFecha(e.fecha)}</th>
                                  <td className="border-b border-gray-300 text-xs md:text-sm">{e.cantidad} </td>
                                  <td className="border-b border-gray-300 text-xs md:text-sm">{calcularCargas(e.cantidad)}</td>
                                  <td className="border-b border-gray-300 font-semibold  text-md md:text-lg">{convertirAPesosColombiano(e.valor)}</td>                         
                                  <td className="text-center border-b border-gray-300 ">
                                    <div className={`badge badge-sm text-xs xs:w-full md:badge-lg py-4 font-semibold border-none ${getCafeClass(e.tipo_cafe)}`} >
                                       {e.tipo_cafe}
                                    </div>         
                                  </td>    
                                  <td className="border-b border-gray-300 w-fit">
  <button className="btn btn-sm text-xs lg:btn-md flex items-center gap-1 bg-[#1A4D2E] text-[#F4E3C0] border-none min-w-max" 
    onClick={() => abrirModalVenta(e)}>
    <PencilSquareIcon className="h-5 w-5" /> Editar
  </button>  
</td>  
                            </tr>
                      </>
                ))}
          </tbody>
    </div>          
   </div>
   <div className="flex justify-between items-center  mt-4 w-full  text-xs md:text-sm text-[#1B1B1B] " >
         <div>
            <span >
              Ventas: {ventas.length}
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
    </div>
  )
}

export default Table;