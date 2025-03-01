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
      const [dataVenta, setDataVenta] = useState({});

      useEffect(() => {fetchVentas()},[estado]);

      const fetchVentas = async () => {
            try {
                  const response = await traerVentas(id_finca);
                  setVentas(response.data);
            } catch (error) {
                  console.error("Error al recuperar las ventas:", error);
            }
      };

      const abrirModalVenta = (venta) => {
            setDataVenta(venta);
            console.log(venta)
            document.getElementById("modal_venta").showModal();
          };

      return (
            <div className="card w-auto shadow-xl  bg-white p-4 md:p-6">
                  <HeaderTable/>
                  <ModalVenta dispatch={dispatch} venta={dataVenta} setDataVenta={setDataVenta}/>
                  <Table ventas={ventas} abrirModalVenta={abrirModalVenta}/>            
            </div>
      );
};

export default TableVentas;
