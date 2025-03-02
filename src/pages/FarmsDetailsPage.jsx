import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarFinca, getFincasPorIdPropietario } from "../api/fincasApi";
import FarmRegisterForm from "../components/FarmRegisterForm";
import ModalAdmin from "../components/ModalAdmin";
import { PencilSquareIcon, UserPlusIcon,HomeModernIcon,ArrowRightIcon  } from "@heroicons/react/24/solid";
import { showConfirmationAlert, showErrorAlert, showSuccessAlert } from "../components/Alerts/AlertService";
import { actualizarEstado } from "../store/slices/stateSlice";
import { useNavigate } from "react-router-dom";

const FarmsDetailsPage = () => {
      const [fincas, setFincas] = useState([]);
      const [dataFinca, setDataFinca] = useState(null);
      const usuario = useSelector(state => state.auth.usuario);
      const estado = useSelector(state => state.estado);
      const [finca, setFinca] = useState({});
      const dispatch = useDispatch();
      const navigate = useNavigate();

      useEffect(() => {
            traerFincas();
      }, [estado]);

      const traerFincas = async () => {
            try {
                  const response = await getFincasPorIdPropietario(
                        usuario.no_identificacion
                  );
                  setFincas(response.data);
            } catch (error) {
                  console.error("Hubo un error al mostrar las fincas:", error);
            }
      };

      const abrirModalAdmin = (finca) => {
            setFinca(finca);
            document.getElementById("modal_admin").showModal();
        };

      const borrarFinca = async (id_finca) => {
            try {
                const isConfirmed = await showConfirmationAlert(
                    'Cuidado',
                    '¿Estás seguro de eliminar esta finca?',
                    'warning'
                );
        
                if (isConfirmed) {
                    const response = await eliminarFinca(id_finca);
                    showSuccessAlert(response.message);
                    dispatch(actualizarEstado());
                }
            } catch (error) {
                showErrorAlert('Hubo un error al intentar eliminar la finca.',error.message);
            }
        };
        
        const abrirModalFinca = (finca) => {
            setDataFinca(finca);
            document.getElementById("modal_finca").showModal();
          };

          const guardarIdFincaYRedirigir = (id_finca,nombre) => {
            sessionStorage.setItem('id_finca',id_finca);
            sessionStorage.setItem('nombre_finca',nombre);
            navigate("/home");
          }

      return (
            <div className="p-2">  
                <dialog id="modal_finca" className="modal">
                        <FarmRegisterForm finca={dataFinca}/>
                </dialog>
                <dialog id="modal_admin" className="modal">
                        <ModalAdmin finca={finca} dispatch={dispatch}/>
                </dialog>
                  
                <div className="flex justify-between mt-2">
                     <h2 className="font-semibold text-[#1B1B1B] text-lg md:text-2xl">Mis fincas</h2>
                   <button
                     className="btn btn-sm text-xs sm:btn-sm lg:btn-md bg-[#1A4D2E] border-none text-[#F4E3C0] flex items-center gap-2"
                     onClick={() => abrirModalFinca()}
                   >
                     <HomeModernIcon className="h-5 w-5" />
                     Nueva finca
                   </button>
                </div>

                <div className="grid grid-cols-12 place-items-center gap-4 mt-6">
                      {fincas.map((f) => (
                      <div key={f.id_finca} className="card col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 bg-white w-full shadow-md hover:shadow-xl transform transition-transform duration-1000 hover:scale-105 cursor-pointer rounded-xl">
                            <div className="card-body">
                                  
                                  <h2 className="text-md md:text-lg font-semibold text-[#3F3F3F] flex items-center justify-between hover:text-[#3F3F3F]">
                                  FINCA {f.nombre} 
                                   <span className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-green-100">
                                     <ArrowRightIcon onClick={()=>guardarIdFincaYRedirigir(f.id_finca,f.nombre)}
                                                     className="w-5 h-5 text-[#1A4D2E] transition-colors duration-300" />
                                   </span>
                                   </h2>
                                  <p className="text-xs font-semibold  text-[#5E5E5E]">
                                        ADMINISTRADOR:{" "}
                                        {f.id_administrador === null ? (
                                             <span className="font-medium">{f.nombres_prop+" "+f.apellidos_prop}</span>
                                        ):(
                                            <span className="font-medium">{f.nombres_admin+" "+f.apellidos_admin}</span>
                                       )}
                                        
                                  </p>
                                  <p className="text-xs font-semibold  text-[#5E5E5E]">
                                        UBICACIÓN:{" "}
                                        <span className="font-medium">{f.ubicacion}</span>
                                  </p>
                                  <p className="text-xs font-semibold  text-[#5E5E5E]">
                                        HECTÁREAS:{" "}
                                        <span className="font-medium">{f.hectareas}</span>
                                  </p>

                                  {/* Botones de acción */}
                                  <div className="flex justify-between mt-4">
                                        
                                        <button className="btn-sm flex items-center px-3 py-2 text-xs  text-[#F4E3C0] bg-[#1A4D2E] rounded-lg"
                                               onClick={()=>abrirModalFinca(f)}>
                                              <PencilSquareIcon className="h-4 w-4 mr-1" />
                                              Editar
                                        </button> 
                                        <button className="btn-sm flex items-center px-3 py-2 text-xs  text-[#F4E3C0] bg-[#1A4D2E] rounded-lg"
                                         onClick={()=>borrarFinca(f.id_finca)}>
                                              <PencilSquareIcon className="h-4 w-4 mr-1" />
                                              Eliminar
                                        </button>
                                        <button className="btn-sm flex items-center px-3 py-2 text-xs  text-[#F4E3C0] bg-[#1A4D2E] rounded-lg"
                                         onClick={()=>abrirModalAdmin(f)}>
                                              <UserPlusIcon className="h-4 w-4 mr-1" />
                                              Asig admin
                                        </button>
                                  </div>
                            </div>
                      </div>
                      ))}
                </div>
            </div>
      );
};

export default FarmsDetailsPage;
