import { useState, useEffect } from "react";
import Header from "./Header";
import Table from "./Table";
import Footer from "../Footer";
import ConnectedUsers from "./ConnectedUsers";
import { getUsuarios } from "../../api/usuariosApi";
import { editarSuscripcion,getHistorialPagosSuscripcion,registrarPagoSuscripcion } from "../../api/suscripcionesApi";
import { useDispatch, useSelector } from "react-redux";
import { actualizarEstado } from "../../store/slices/stateSlice";
import SearchInput from "./SearchInput";
import ModalPagosSuscripcion from "./Modals/ModalPagosSuscripcion";

const  CPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const dispatch = useDispatch();
  const estado = useSelector((state) => state.estado);
  const [termino, setTermino] = useState("");
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, [estado]);

    const fetchUsuarios = async () => {
    try {
          const response = await getUsuarios();           
          setUsuarios(response.data);
    } catch (error) {
          console.error(
                "Hubo un error al recuperar los usuarios de GestCafe",
                error
          );
        }
      };

      const fetchHistorialPagosSuscripcion = async (idSuscripcion) => {
        const response = await getHistorialPagosSuscripcion(idSuscripcion);
        setHistorial(response.data);
      };

      const abrirModalHistorialPagos = (idSuscripcion) => {
         fetchHistorialPagosSuscripcion(idSuscripcion)
        document.getElementById("modal_suscripcion").showModal();
  };
      const activarPlanSuscripcion = async (id_suscripcion) => {
        const fechaHora = new Date(); // Capturar la fecha y hora actual
        const fechaMySQL = fechaHora.toISOString().slice(0, 19).replace("T", " "); // Formato MySQL
    
        // Clonar la misma fecha y sumar un mes
        const fechaSuspension = new Date(fechaHora.getTime()); // Clonar la fecha actual
        fechaSuspension.setMonth(fechaSuspension.getMonth() + 1);
        const fechaSuspensionMySQL = fechaSuspension.toISOString().slice(0, 19).replace("T", " ");

        await modificarSuscripcion(id_suscripcion, fechaMySQL,fechaSuspensionMySQL);
        await guardarPagoSuscripcion(id_suscripcion, fechaMySQL);
        dispatch(actualizarEstado());
    };
    
    const modificarSuscripcion = async (id_suscripcion, fechaMySQL,fechaSuspensionMySQL) => {
        try {
            const suscripcion = { fecha_inicio: fechaMySQL,fecha_suspension:fechaSuspensionMySQL,estado:'ACTIVO' }; // Incluir la fecha en los datos
            const response = await editarSuscripcion(id_suscripcion, suscripcion); // Pasar la fecha a la API
            console.log(response.message);
        } catch (error) {
            console.error("Hubo un error al intentar modificar los datos de la suscripción.", error.response.data.error);
        }
    };
    
    const guardarPagoSuscripcion = async (id_suscripcion, fechaMySQL) => {
        try {
            const pago_suscripcion = {monto:50000,fecha_pago: fechaMySQL,id_suscripcion:id_suscripcion }; // Incluir la fecha en los datos
            const response = await registrarPagoSuscripcion(pago_suscripcion); // Pasar la fecha a la API
            console.log(response.message);  
        } catch (error) {
          console.error("Hubo un error al registrar el pago de la suscripción.", error.response.data.error);
        }
    };
    
   // 🔍 **Filtrar empleados en cada render**
   const allUsuarios = usuarios.filter(user =>
    user.nombres.toLowerCase().includes(termino.toLowerCase())
 );

  return (
      <div className="w-auto min-h-screen bg-gray-200  p-4 md:p-6">

        <Header />
        <ModalPagosSuscripcion historial={historial} setHistorial={setHistorial} setTermino={setTermino} />
        {/* Contenedor principal con 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Columna principal con la tabla */}
          <div className="col-span-4 md:col-span-3 card shadow-xl bg-white p-4 md:p-6">
            <SearchInput termino={termino} setTermino={setTermino} />
            <Table allUsuarios={allUsuarios} activarPlanSuscripcion={activarPlanSuscripcion} abrirModalHistorialPagos={abrirModalHistorialPagos} />
          </div>
  
          {/* Columna lateral con usuarios conectados */}
          <div className="col-span-4 md:col-span-1">
            <ConnectedUsers />
          </div>
  
        </div>
  
        <Footer />
      </div>
    );
  };
  
  export default CPanel;
