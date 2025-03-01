import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registrarAdelanto } from "../../../api/adelantosApi";
import { convertirAPesosColombiano, formatearSoloFecha } from "../../../utils/formatter";
import { actualizarEstado } from "../../../store/slices/stateSlice";


const ModalAdelantos = ({historial,setHistorial,setTermino,id_asignacion,dispatch}) => {
  const [mensaje,setMensaje]=useState("");
   const cerrarModal =()=>{
    setHistorial({});
    setTermino("");
    document.getElementById("modal_adelantos").close()
   };

  const validationSchema = Yup.object({
    valor: Yup.string()
      .required("El monto es obligatorio *")
      .matches(/^[0-9]+$/, "Solo se permiten números *"),
   
  });

  const guardarAdelanto = async (values, { resetForm }) => {
     const adelanto = { valor: values.valor, id_asignacion};
    try {
        const response = await registrarAdelanto(adelanto);
        setMensaje(response.message);
        resetForm();
        setTimeout(() => setMensaje(""), 2000); 
        dispatch(actualizarEstado());
        cerrarModal();
    } catch (error) {
       setMensaje("Hubo un error al guardar el adelanto"+" "+error.response.data.error);
    }
};
  

  return (
    <dialog id="modal_adelantos" className="modal">
      <div className="modal-box max-w-sm p-4 rounded-lg shadow-lg bg-white">
      <Formik
            initialValues={{valor:""}}
            validationSchema={validationSchema}
            onSubmit={guardarAdelanto}
          >
            {({ isSubmitting }) => (
                <Form>
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2  text-[#1B1B1B] hover:text-[#3F3F3F]"     
          onClick={cerrarModal}
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold  text-[#1B1B1B] mb-2">
            Registrar adelanto
        </h3>
        <label className="block text-sm mb-1  text-[#3F3F3F] ">
           Ingrese el monto del adelanto.
        </label>
        <div className="flex items-center gap-2 p-1">
          <Field
            type="text"
            name="valor"
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none  bg-gray-50 text-[#1B1B1B]"
            placeholder="Monto"
            
          />
          <button
           type="submit"
            className="btn btn-sm text-sm bg-[#1A4D2E] text-[#F4E3C0] border-none"
            disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </div>
         <ErrorMessage
                    name="valor"
                    component="div"
                    className="text-red-600 text-sm mt-1"
         />
         {mensaje && (
            <div className="text-green-600 text-sm">{mensaje}</div>
          )}
        </Form>
            )}
          </Formik>
        {historial && Object.keys(historial).length > 0 ? (  
        <>
        <h3 className="text-xl font-semibold  text-[#1B1B1B] mt-4">Historial de adelantos</h3>
        <div className="space-y-2 max-h-80 overflow-y-auto p-2">
        {Object.keys(historial).map((fecha) => (
              <div key={fecha} className=" bg-gray-50 p-4 rounded-lg shadow-md">
                {/* Fecha como encabezado */}
                <h3 className="text-md font-semibold text-[#3F3F3F] border-b pb-2">
                  {formatearSoloFecha(fecha)}
                </h3>

                {/* Registros por fecha */}
                <ul className="mt-2 space-y-2">
                  {historial[fecha].map((adelanto) => (
                    <li
                      key={adelanto.id}
                      className="flex justify-between items-center p-3 bg-[#c4f4be]  rounded-lg shadow-sm"
                    >
                      <span className="text-[#5E5E5E]">{adelanto.hora}</span>
                      <span className="text-lg font-semibold text-[#1A4D2E]">{convertirAPesosColombiano(adelanto.valor)} </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
        </>
        ):(
          <p className="text-center text-[#5E5E5E] text-sm mt-3">No hay adelantos registrados.</p>
        )}
      </div>
    </dialog>
  );
};

export default ModalAdelantos;
