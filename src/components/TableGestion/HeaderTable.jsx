import React from "react";
import { finalizarSemana } from "../../api/semanasApi";
import { actualizarEstado } from "../store/slices/stateSlice";
import { showErrorAlert, showSuccessAlert } from "../Alerts/AlertService";

const HeaderTable = ({id_semana,dispatch,empleadosAsig}) => {


      const finalizarSemanaTrabajo =async()=>{
            try {
                  const response = await finalizarSemana(id_semana);
                  showSuccessAlert("Felicidades",response.message);
                  dispatch(actualizarEstado());
            } catch (error) {
                  showErrorAlert("Error al finalizar la semana:",error.response.data.error)
            }
      }
   

      return (
            <div className="w-full flex justify-between mb-4">
                  <div>
                        <h2 className="font-semibold  text-[#1B1B1B] text-lg md:text-2xl">
                              Gestión de empleados
                        </h2>
                  </div>
                  <div className="flex gap-2">     
                  <button
                              className="btn btn-sm sm:btn-sm lg:btn-md  bg-[#8C2F39] text-[#F4E3C0] border-none"
                              disabled={id_semana ? false : true}
                              onClick={finalizarSemanaTrabajo}
                        >
                               Finalizar
                        </button>           
                        <button
                              className="btn btn-sm sm:btn-sm lg:btn-md  bg-[#8C2F39] text-[#F4E3C0] border-none"
                              disabled={id_semana ? false : true}
                              onClick={() =>
                                    document
                                          .getElementById("modal_asignacion")
                                          .showModal()
                              }
                            
                        >
                              Asignar
                        </button>
                        <button
                              className="btn btn-sm sm:btn-sm lg:btn-md  bg-[#8C2F39] text-[#F4E3C0] border-none"
                              disabled={id_semana ? false : true}
                              onClick={() =>
                                    document
                                          .getElementById("modal_empleado")
                                          .showModal()
                              }
                        >
                               Empleado
                        </button>
                  </div>
            </div>
      );
};

export default HeaderTable;
