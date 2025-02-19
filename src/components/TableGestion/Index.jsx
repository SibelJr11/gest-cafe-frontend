import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderTable from "./HeaderTable";
import FooterTable from "./FooterTable";
import ModalEmpleado from "./Modals/ModalEmpleado";
import ModalKilo from "./Modals/ModalKilo";
import ModalAsignacion from "./Modals/ModalAsignacion";
import ModalSemana from "./Modals/ModalSemana";
import { recuperarEmpleadosAsignados } from "../../api/asignacionesApi";
import { convertirAPesosColombiano } from "../../utils/formatter";
import { traerUltimoIdSemana } from "../../api/semanasApi";
import { actualizarEstado } from "../store/slices/stateSlice";
import { registrarPago } from "../../api/pagosApi";
import { showErrorAlert } from "../Alerts/AlertService";
import Table from "./Table";

const TableGestion = () => {
      const precioArroba = useSelector((state) => state.precioArroba.precio);
      const [id_semana, set_IdSemana] = useState("");
      const [empleadosAsig, setEmpleadosAsig] = useState([]);
      const [id_asignacion, setIdAsignacion] = useState("");
      const id_finca = sessionStorage.getItem("id_finca");
      const estado = useSelector((state) => state.estado);
      const dispatch = useDispatch();  

      useEffect(() => {
            traerEmpleadosAsignados();
            traerIdSemana();
      }, [estado]);

      const traerIdSemana = async () => {
            try {
                  const response = await traerUltimoIdSemana(id_finca);
                  set_IdSemana(response.data);
            } catch (error) {
                  console.error("Error al recuperar la ultima semana:", error);
            }
      };

      const traerEmpleadosAsignados = async () => {
            try {
                  const response = await recuperarEmpleadosAsignados(id_finca);
                  setEmpleadosAsig(response.data);
            } catch (error) {
                  console.error(
                        "Error al mostrar los empleados asignados:",
                        error
                  );
            }
      };

    

      const calcularSalario = (kilos) => {
            const valor_Kilo = precioArroba / 12.5;
            const valor_Salario = kilos * valor_Kilo;
            return convertirAPesosColombiano(valor_Salario);
      };

      const abrirModalKilo = (id) => {
            setIdAsignacion(id);
            document.getElementById("modal_kilos").showModal();
      };

      const realizarPago = async (id_asignacion, kilos) => {
            if (kilos === 0) {
                  showErrorAlert(
                        "Ups!",
                        "No puedes realizarle el pago por que aún no ha trabajado."
                  );
                  return;
            }
            try {
                  const valor_Kilo = precioArroba / 12.5;
                  const valor = kilos * valor_Kilo;
                  const observacion = `Recolecto ${kilos} kilos. Se pagó la arroba a: ${convertirAPesosColombiano(precioArroba)} y el kilo a: ${convertirAPesosColombiano(valor_Kilo)}.`;
                  const pago = { valor, observacion, id_asignacion };
                  await registrarPago(pago);
                  dispatch(actualizarEstado());
            } catch (error) {
                  showErrorAlert(
                        "Error al registrar el pago!",
                        error.response.data.error
                  );
            }
      }

      return (
            <>
                  <div className="card w-auto shadow-xl bg bg-white p-6">
                        <HeaderTable id_semana={id_semana} dispatch={dispatch} empleadosAsig={empleadosAsig} />
                        <ModalEmpleado />
                        <ModalSemana  dispatch={dispatch}/>
                        <ModalAsignacion
                              id_semana={id_semana}
                        />
                        <ModalKilo id_asignacion={id_asignacion} />
                        {id_semana ? (
                               <Table
                               empleadosAsig={empleadosAsig}
                               calcularSalario={calcularSalario}
                               abrirModalKilo={abrirModalKilo}
                               realizarPago={realizarPago}
                             />                          
                        ) : (
                              <button
                              className="btn btn-md md:btn-lg bg-[#1A4D2E] border-none text-[#F4E3C0]"
                              onClick={() =>
                                    document
                                          .getElementById("modal_semana")
                                          .showModal()
                              }
                        >
                              Crear nueva semana
                        </button>  
                        )}
                  </div>
                  <div className="card w-auto shadow-xl bg bg-white p-6 mt-4 border border-none">
                        <FooterTable empleadosAsig={empleadosAsig} />
                  </div>
            </>
      );
};

export default TableGestion;
