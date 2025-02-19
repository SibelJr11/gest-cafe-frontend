import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderTable from "./HeaderTable";
import Table from "./Table";
import { traerVentas } from "../../api/ventasApi"; // Adjust the import path as necessary
import ModalVenta from "./Modals/ModalVenta";

const TableVentas = () => {

      const id_finca = sessionStorage.getItem("id_finca");
      const estado = useSelector((state) => state.estado);
      const dispatch = useDispatch();
      const [ventas, setVentas] = useState([]);

      useEffect(() => {fetchVentas()},[estado]);

      const fetchVentas = async () => {
            try {
                  const response = await traerVentas(id_finca);
                  setVentas(response.data);
            } catch (error) {
                  console.error("Error al recuperar las ventas:", error);
            }
      };



      return (
            <>
            <div className="card w-auto shadow-xl bg bg-white p-6">
                  <HeaderTable/>
                  <ModalVenta dispatch={dispatch}/>
                  <Table ventas={ventas}/>                          
               
            </div>

               {/* <div className="card w-auto shadow-xl bg bg-white p-6 mt-4 border border-none">
                        <FooterTable empleadosAsig={empleadosAsig} />
                  </div>*/}  
            </>
      );
};

export default TableVentas;
