import { useEffect, useState } from "react";
import { getPagos_KilosByIdFincaYAño, getPagos_KilosByIdPropietarioYAño } from "../api/fincasApi";
import CostChart from "../components/Graphics/CostChart";
import FincaChart from "../components/Graphics/FincaChart";
import ProductionChart from "../components/Graphics/ProductionChart";
import InfoCafeSecoChart from "../components/Graphics/InfoCafeSecoChart";
import InfoCafeVerdeChart from "../components/Graphics/InfoCafeVerdeChart";
import InfoPasillaChart from "../components/Graphics/InfoPasillaChart";
import { useDispatch, useSelector } from "react-redux";
import { actualizarEstado } from "../store/slices/stateSlice";
import {getInfoVentasCafeSeco, getInfoVentasCafeVerde, getInfoVentasPasilla } from "../api/ventasApi";

const AnalyticsPage = () => {
  
 const [totalesFinca,setTotalesFinca]=useState([]);
 const [infoFincas,setInfoFincas]=useState([]);
 const [year,setYear] = useState(new Date().getFullYear());
 const [cafeSeco, setCafeSeco] = useState([]);
 const [cafeVerde, setCafeVerde] = useState([]);
 const [pasilla, setPasilla] = useState([]);
 const estado = useSelector(state => state.estado);
 const dispatch = useDispatch();
 const nombreFinca=sessionStorage.getItem('nombre_finca');
 const idFinca = sessionStorage.getItem('id_finca');
 const no_identificacion = useSelector(state => state.auth.usuario.no_identificacion);



   useEffect(() => {
      fetchKilosYPagosFinca();
      fetchInfoFincas();
      fetchDataVentasCafeSeco();
      fetchDataVentasCafeVerde();
      fetchDataVentasPasilla();
     
   }, [estado]);


   const fetchKilosYPagosFinca = async () => {
      try {
         const response = await getPagos_KilosByIdFincaYAño(idFinca, year);
         setTotalesFinca(response.data);
      } catch (error) {
         console.error("Error al mostrar los pagos y kilos de la finca:", error);
      }
   };

   const fetchInfoFincas = async () => {
      try {
         const response = await getPagos_KilosByIdPropietarioYAño(no_identificacion, year);
         setInfoFincas(response.data);
      } catch (error) {
         console.error("Error al mostrar los pagos y kilos de la fincas:", error);
      }
   };

   const fetchDataVentasCafeSeco = async () => {
      try {
         const response = await getInfoVentasCafeSeco(idFinca,year);
         setCafeSeco(response.data);
      } catch (error) {
         console.error("Error al mostrar la información de ventas de café seco:", error);
      }
   };
  

   const fetchDataVentasCafeVerde = async () => {
      try {
         const response = await getInfoVentasCafeVerde(idFinca,year);
         setCafeVerde(response.data);
      } catch (error) {
         console.error("Error al mostrar la información de ventas de café verde:", error);
      }
   };

   const fetchDataVentasPasilla = async () => {
      try {
         const response = await getInfoVentasPasilla(idFinca,year);
         setPasilla(response.data);
      } catch (error) {
         console.error("Error al mostrar la información de ventas de pasilla:", error);
      }
   };

 
   const handleChange=(e)=>{
     setYear(e.target.value);
     dispatch(actualizarEstado())
   }
   const añosDefault =[2022,2023,2024];

return (
   <div>
      <div className="flex justify-between mt-2 p-2">
         <h1 className="font-semibold text-[#1B1B1B] text-lg md:text-2xl">Análisis de Café (Finca {nombreFinca})</h1>
         <div className="">
            <select className="select select-sm md:select-md w-full text-sm md:text-lg bg-white text-[#1B1B1B]" onChange={handleChange}>
               <option>{new Date().getFullYear()}</option>
               {añosDefault.map((año, index) => (
                  <option key={index} value={año}>{año}</option>
               ))}
            </select>
         </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-4">
         {totalesFinca.length > 0 && (
           
             <div className="card col-span-12 w-full sm:w-auto shadow-xl bg-white p-6 ">
             <CostChart  totalesFinca={totalesFinca} />
           </div>
         
         )}
         {totalesFinca.length > 0 && (
            <div className="card col-span-12 w-auto shadow-xl bg bg-white p-6">
               <ProductionChart totalesFinca={totalesFinca} />
            </div>
         )}
         {infoFincas.length > 0 && (
            <div className="card col-span-12 w-auto shadow-xl bg bg-white p-6">
               <FincaChart infoFincas={infoFincas} />
            </div>
         )}
         {cafeSeco.length > 0 && (
            <div className="card col-span-12 w-auto shadow-xl bg bg-white p-6">
               <InfoCafeSecoChart cafeSeco={cafeSeco} />
            </div>
         )}
         {cafeVerde.length > 0 && (
            <div className="card col-span-12 w-auto shadow-xl bg bg-white p-6">
               <InfoCafeVerdeChart cafeVerde={cafeVerde} />
            </div>
         )}
         {pasilla.length > 0 && (
            <div className="card col-span-12 w-auto shadow-xl bg bg-white p-6">
               <InfoPasillaChart pasilla={pasilla} />
            </div>
         )}
      </div>
   </div>
);
};

export default AnalyticsPage; 