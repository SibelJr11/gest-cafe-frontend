import React from "react";
import { formatearSoloFecha } from "../../../utils/formatter";


const ModalHistorialKilos = ({historial,setHistorial,setTermino}) => {

    const cerrarModal =()=>{
      setHistorial({});
      setTermino("");
      document.getElementById("modal_historial").close()
    };


  return (
    <dialog id="modal_historial" className="modal">
    <div className="modal-box max-w-sm p-4 rounded-lg shadow-lg bg-white ">
  
           
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2  text-[#1B1B1B] hover:text-[#3F3F3F]"     
              onClick={() => cerrarModal()}
             >
              ✕
            </button>
            <h3 className="text-xl font-semibold  text-[#1B1B1B] mb-4">
            Historial de esta semana
          </h3>

          <div className="space-y-2 max-h-80 overflow-y-auto p-2 ">
            {Object.keys(historial).map((fecha) => (
              <div key={fecha} className="bg-gray-50 p-4 rounded-lg shadow-md">
                {/* Fecha como encabezado */}
                <h3 className="text-md font-semibold text-[#3F3F3F] border-b pb-2">
                  {formatearSoloFecha(fecha)}
                </h3>

                {/* Registros por fecha */}
                <ul className="mt-2 space-y-2">
                  {historial[fecha].map((registro) => (
                    <li
                      key={registro.id}
                      className="flex justify-between items-center p-3 bg-green-100 rounded-lg shadow-sm border border-green-200"
                    >
                      <span className="text-[#5E5E5E]">{registro.hora}</span>
                      <span className="text-lg font-semibold text-[#1A4D2E]">{registro.kilos} kg</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        
    </div>
  </dialog>
   
  );
};

export default ModalHistorialKilos;
