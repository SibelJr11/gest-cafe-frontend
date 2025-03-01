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
import { actualizarEstado } from "../../store/slices/stateSlice";
import { registrarPago } from "../../api/pagosApi";
import { showErrorAlert, showSuccessAlert } from "../Alerts/AlertService";
import Table from "./Table";
import ModalHistorialKilos from "./Modals/ModalHistorialKilos";
import { getHistorialKilosByEmpleado } from "../../api/jornalesApi";
import ModalAdelantos from "./Modals/ModalAdelantos";
import { getHistorialAdelantosByEmpleado } from "../../api/adelantosApi";
import SearchInput from "./SearchInput";

const TableGestion = () => {
      const precioArroba = useSelector((state) => state.precioArroba.precio);
      const [id_semana, set_IdSemana] = useState("");
      const [empleados, setEmpleados] = useState([]);
      const [termino, setTermino] = useState("");
      const [historial,setHistorial] = useState({});
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
                  console.error("Hubo un error al recuperar la ultima semana:", error);
            }
      };

      const traerEmpleadosAsignados = async () => {
            try {
                  const response = await recuperarEmpleadosAsignados(id_finca);           
                  setEmpleados(response.data);
            } catch (error) {
                  console.error(
                        "Hubo un error al mostrar los empleados asignados:",
                        error
                  );
            }
      };

      const calcularSalario = (kilos) => {
            const valor_Kilo = precioArroba / 12.5;
            const valor_Salario = kilos * valor_Kilo;
            return valor_Salario;
      };

      const agruparPorFecha = (data) => {
            return data.reduce((acc, item) => {
              if (!acc[item.fecha]) {
                acc[item.fecha] = [];
              }
              acc[item.fecha].push(item);
              return acc;
            }, {});
          };


      const abrirModalKilo = (id) => {
            setIdAsignacion(id);
            document.getElementById("modal_kilos").showModal();
      };

      const fetchHistorialKilos = async (idAsignacion) => {
            const response = await getHistorialKilosByEmpleado(idAsignacion);
            setHistorial(agruparPorFecha(response.data));
          };

      const abrirModalHistorialKilos = (idAsignacion) => {
            fetchHistorialKilos(idAsignacion)
            document.getElementById("modal_historial").showModal();
      };
      
      const fetchHistorialAdelantos = async (idAsignacion) => {
            const response = await getHistorialAdelantosByEmpleado(idAsignacion);
            setHistorial(agruparPorFecha(response.data));
          };

      const abrirModalHistorialAdelantos = (idAsignacion) => {
            setIdAsignacion(idAsignacion);
            fetchHistorialAdelantos(idAsignacion)
            document.getElementById("modal_adelantos").showModal();
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
                  const response = await registrarPago(pago);
                  showSuccessAlert(response.message);
                  setTermino("");
                  dispatch(actualizarEstado());
            } catch (error) {
                  showErrorAlert(
                        "Hubo un error al registrar el pago!",
                        error.response.data.error
                  );
            }
      }

    // 🔍 **Filtrar empleados en cada render**
   const empleadosAsig = empleados.filter(emp =>
       emp.nombre.toLowerCase().includes(termino.toLowerCase())
    );
      return (
            <>
                  <div className="card w-auto shadow-xl bg-white p-4 md:p-6">
                        <HeaderTable id_semana={id_semana} dispatch={dispatch} />
                        <ModalEmpleado setTermino={setTermino}/>
                        <ModalSemana  dispatch={dispatch}/>
                        <ModalAsignacion
                              id_semana={id_semana}
                              empleados={empleados}
                              setTermino={setTermino}
                        />
                        <ModalKilo id_asignacion={id_asignacion} setTermino={setTermino}/>
                        <ModalHistorialKilos historial={historial} setHistorial={setHistorial} setTermino={setTermino}/>
                        <ModalAdelantos historial={historial} setHistorial={setHistorial} setTermino={setTermino} id_asignacion={id_asignacion} dispatch={dispatch} />
                   

                       {id_semana ? (
                        <>
                              <SearchInput termino={termino} setTermino={setTermino} />
                               <Table
                               empleadosAsig={empleadosAsig}
                               calcularSalario={calcularSalario}
                               abrirModalKilo={abrirModalKilo}
                               abrirModalHistorialKilos={abrirModalHistorialKilos}
                               abrirModalHistorialAdelantos={abrirModalHistorialAdelantos}
                               realizarPago={realizarPago}
                             />  
                        </>                        
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
                        <FooterTable empleados={empleados} />
                  </div>
            </>
      );
};

export default TableGestion;
