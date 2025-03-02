import React from "react";
import { convertirAPesosColombiano, formatearSoloFecha } from "../../../utils/formatter";
const ModalPagosSuscripcion = ({ historial, setHistorial, setTermino }) => {
  const cerrarModal = () => {
    setHistorial([]);
    setTermino("");
    document.getElementById("modal_suscripcion").close();
  };

  return (
    <dialog id="modal_suscripcion" className="modal">
      <div className="modal-box max-w-md p-4 rounded-lg shadow-lg bg-white">
        {/* Botón de cerrar */}
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-700 hover:text-gray-900"
          onClick={cerrarModal}
        >
          ✕
        </button>

        {/* Título */}
        <h3 className="text-xl font-semibold  text-[#1B1B1B] mb-4">
          Historial de Pagos de Suscripción
        </h3>

        {/* Contenedor del historial */}
        <div className="space-y-4 max-h-80 overflow-y-auto p-2">
          {historial.length === 0 ? (
            <p className="text-[#3F3F3F] text-center">No hay pagos registrados.</p>
          ) : (
            historial.map((pago) => (
              <div
                key={pago.id_pago}
                className="flex flex-col p-3 bg-green-100 rounded-lg shadow-sm border border-green-200"
              >
                <span className="text-base text-[#3F3F3F]">
                  {formatearSoloFecha(pago.fecha_pago)} 
                </span>
                <span className="text-lg font-semibold text-[#1A4D2E]">
                  {convertirAPesosColombiano(pago.monto)} /mes
                </span>
               
              </div>
            ))
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ModalPagosSuscripcion;
