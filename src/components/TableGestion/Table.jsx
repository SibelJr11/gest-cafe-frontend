import React, { useState } from 'react'
import { ScaleIcon, BanknotesIcon, ClockIcon, CurrencyDollarIcon,ChevronLeftIcon,ChevronRightIcon } from "@heroicons/react/24/solid";
import { convertirAPesosColombiano } from '../../utils/formatter';

const Table = ({empleadosAsig,calcularSalario,abrirModalKilo,abrirModalHistorialKilos,abrirModalHistorialAdelantos,realizarPago}) => {
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
<div>
  <div className="overflow-x-scroll sm:overflow-x-scroll">
    <div className="table table-auto size-full border-separate border-spacing-0 table-sm sm:table-sm md:table-sm lg:table-md">
      <thead className="bg-[#1A4D2E] text-xs md:text-sm text-[#E0D2B8] text-semibold">
        <tr>
          {/*<th className='w-1'>No.</th>*/}
          <th>Empleado</th>
          <th>Kilos</th>
          <th>Salario</th>
          <th>Adelantos</th>
          <th>Total a pagar</th>
          <th className="w-auto">Opciones</th>
        </tr>
      </thead>
      <tbody className="text-[#3F3F3F]">
        {elementosActuales.map((e) => (
          <tr key={e.id_asignacion}>
            {/*<th className="text-xs md:text-sm font-semibold border-b border-gray-300">{e.id_asignacion}</th>*/}
            <td className="text-xs md:text-sm font-semibold border-b border-gray-300">{e.nombre}</td>
            <td className="text-xs md:text-sm border-b border-gray-300 ">{e.kilos}</td>
            <td className="text-md md:text-lg font-semibold border-b border-gray-300 ">{convertirAPesosColombiano(calcularSalario(e.kilos))}</td>
            <td className="text-md md:text-lg font-semibold border-b border-gray-300 ">{convertirAPesosColombiano(e.adelantos)}</td>
            <td className="text-md md:text-lg font-semibold border-b border-gray-300 ">{convertirAPesosColombiano(calcularSalario(e.kilos)-e.adelantos)}</td>
            <td className="h-auto grid grid-cols-2 md:flex md:flex-row gap-2 border-b border-gray-300 w-auto min-w-max">
                <button className="btn btn-sm text-xs  lg:btn-md   flex items-center gap-1 bg-[#1A4D2E] text-[#F4E3C0] border-none" onClick={() => abrirModalKilo(e.id_asignacion)}>
                <ScaleIcon className="h-5 w-5" /> Kilos
              </button>
              <button className="btn btn-sm text-xs  lg:btn-md   flex items-center gap-1 bg-[#1A4D2E] text-[#F4E3C0] border-none" onClick={() =>abrirModalHistorialAdelantos(e.id_asignacion)}>
                <BanknotesIcon className="h-5 w-5" /> Adelantos
              </button>
              <button className="btn btn-sm text-xs  lg:btn-md   flex items-center gap-1 bg-[#1A4D2E] text-[#F4E3C0] border-none" disabled={e.kilos === 0} onClick={() => abrirModalHistorialKilos(e.id_asignacion)}>
                <ClockIcon className="h-5 w-5" /> Historial
              </button>
              <button className="btn btn-sm text-xs  lg:btn-md   flex items-center gap-1 bg-[#1A4D2E] text-[#F4E3C0] border-none" onClick={() => realizarPago(e.id_asignacion, e.kilos)}>
                <CurrencyDollarIcon className="h-5 w-5" /> Pagar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  </div>
  
  <div className="flex justify-between items-center mt-4  w-full text-xs md:text-sm text-[#1B1B1B]">
    <span>Empleados: {empleadosAsig.length}</span>
    <div className='flex items-center gap-3'>
      <span>Página {paginaActual} de {totalPaginas}</span>
      <button className="btn btn-xs md:btn-sm bg-[#1A4D2E] text-[#F4E3C0] border-none flex items-center" disabled={paginaActual === 1} onClick={irAPaginaAnterior}>
        <ChevronLeftIcon className="w-3 md:w-4" />
      </button>
      <button className="btn btn-xs md:btn-sm bg-[#1A4D2E] text-[#F4E3C0] border-none flex items-center" disabled={paginaActual === totalPaginas} onClick={irAPaginaSiguiente}>
        <ChevronRightIcon className="w-3 md:w-4" />
      </button>
    </div>
  </div>
</div>

  )
}

export default Table