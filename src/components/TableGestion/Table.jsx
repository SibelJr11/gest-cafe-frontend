import React, { useState } from 'react'

const Table = ({empleadosAsig,calcularSalario,abrirModalKilo,realizarPago}) => {
      const [paginaActual, setPaginaActual] = useState(1);
      const empleadosPorPagina = 5;

      // Calcular los índices de los elementos a mostrar
      const indiceUltimoElemento = paginaActual * empleadosPorPagina;10
      const indicePrimerElemento = indiceUltimoElemento - empleadosPorPagina;
      const elementosActuales = empleadosAsig.slice(indicePrimerElemento, indiceUltimoElemento);
    
      // Cambiar de página
      const totalPaginas = Math.ceil(empleadosAsig.length / empleadosPorPagina);
    
      const irAPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
      };
    
      const irAPaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
      };

  return (
    <div className="overflow-x-scroll sm:overflow-x-scroll">                      
    <div className="table  sm:table-auto size-full border-separate border-spacing-0 table-sm sm:table-sm md:table-sm lg:table-md ">
          <thead className="bg-[#1A4D2E] text-xs md:text-sm text-[#E0D2B8] text-semibold">
                <th className='w-1' >Id</th>
                <th>Empleado</th>
                <th>Kilos</th>
                <th>Salario</th>
                <th>Opciones</th>
          </thead>
          <tbody className="text-[#3F3F3F]">
                {elementosActuales.map((e) => (
                      <>
                            <tr key={e.id_asignacion}>
                                  <th className="w-auto border-b border-gray-300">
                                        {e.id_asignacion}
                                  </th>
                                  <td className="border-b border-gray-300">
                                        <div className="flex items-center gap-3">
                                              <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                          <img
                                                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                                alt="Avatar Tailwind CSS Component"
                                                          />
                                                    </div>
                                              </div>
                                              <div>
                                                    <div className="font-semibold">
                                                          {
                                                                e.nombre
                                                          }
                                                    </div>
                                              </div>
                                        </div>
                                  </td>
                                  <td className="border-b border-gray-300">
                                        {e.kilos}
                                  </td>
                                  <td className="font-bold text-lg text-center border-b border-gray-300">
                                        {calcularSalario(e.kilos)}
                                  </td>
                                  <th className="h-auto flex justify-center gap-2 flex-wrap border-b border-gray-300">
                                        <button
                                              className="btn  btn-sm text-xs sm:btn-sm lg:btn-md bg-[#1A4D2E] text-[#F4E3C0] border-none"
                                              onClick={()=>abrirModalKilo(e.id_asignacion)}>
                                              Kilos
                                        </button>
                                        <button className="btn btn-sm text-xs sm:btn-sm lg:btn-md bg-[#1A4D2E] text-[#F4E3C0] border-none"
                                                onClick={()=>realizarPago(e.id_asignacion,e.kilos)}>
                                              Pagar
                                        </button>
                                       
                                  </th>
                            </tr>
                      </>
                ))}
          </tbody>

    </div>  
    <div className="flex justify-between items-center  mt-4 mb-4 w-full  text-xs md:text-sm text-[#1B1B1B] " >
         <div>
            <span >
              Empleados: {empleadosAsig.length}
            </span>
         </div>
       
          <div className='flex  items-center gap-3'>
               <span>
                 Página {paginaActual} de {totalPaginas}
               </span>
               <button
                 className="btn btn-sm  bg-[#1A4D2E] text-[#F4E3C0] border-none"
                 disabled={paginaActual === 1}
                 onClick={irAPaginaAnterior}
               >
                 {"<"}
               </button>
             
               <button
                  className="btn btn-sm  bg-[#1A4D2E] text-[#F4E3C0] border-none"
                 disabled={paginaActual === totalPaginas}
                 onClick={irAPaginaSiguiente}
               >
                {">"}
               </button>
          </div>  
    </div>             
</div>
  )
}

export default Table