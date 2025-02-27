import React from "react";
import { finalizarSemana } from "../../api/semanasApi";
import { actualizarEstado } from "../../store/slices/stateSlice";
import { showErrorAlert, showSuccessAlert } from "../Alerts/AlertService";
import { CheckCircleIcon, UserPlusIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

const HeaderTable = ({id_semana,dispatch}) => {

      const finalizarSemanaTrabajo =async()=>{
            try {
                  const response = await finalizarSemana(id_semana);
                  showSuccessAlert(response.message);
                  dispatch(actualizarEstado());
            } catch (error) {
                  showErrorAlert("Hubo un error al finalizar la semana:",error.response.data.error)
            }
      }
   

      return (
            <div className="w-full flex justify-between mb-6">
                  <div>
                        <h2 className="font-semibold  text-[#1B1B1B] text-lg md:text-2xl">
                              Gestión de empleados
                        </h2>
                  </div>
                  <div className="flex flex-wrap justify-end gap-1">   

                    <button
                    className={`btn btn-sm text-xs  lg:btn-md flex items-center gap-2 bg-[#1A4D2E] text-[#F4E3C0] border-none ${!id_semana ? "hidden" : ""}`}
                      onClick={finalizarSemanaTrabajo}
                    >
                      <CheckCircleIcon className="h-5 w-5" />
                      Finalizar
                    </button>
                    
                    <button className={`btn btn-sm text-xs  lg:btn-md flex items-center gap-2 bg-[#1A4D2E] text-[#F4E3C0] border-none ${!id_semana ? "hidden" : ""}`}
                            onClick={() => document.getElementById("modal_asignacion").showModal()} 
                    > 
                      <ClipboardDocumentCheckIcon className="h-5 w-5" /> 
                      Asignar 
                    </button> 
                     
                    <button 
                        className={`btn btn-sm text-xs  lg:btn-md flex items-center gap-2 bg-[#1A4D2E] text-[#F4E3C0] border-none ${!id_semana ? "hidden" : ""}`}                      
                        onClick={() => document.getElementById("modal_empleado").showModal()}
                    >
                      <UserPlusIcon className="h-5 w-5" />
                      Empleado
                    </button>

                  </div>
            </div>
      );
};

export default HeaderTable;
