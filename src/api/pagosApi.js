import Swal from "sweetalert2";
import axiosInstance from "./axiosIntance";

export const registrarPago = async (pago) => {
      try {
            const response = await axiosInstance.post("/api/pagos", pago);
            return response.data;
      } catch (error) {
            console.error("Hubo un error al registrar el pago:", error);
            throw error;
      }
};

export const buscarTodosPagos = async (id_finca, pagina) => {
      try {
            const response = await axiosInstance.get(
                  `/api/pagos/${id_finca}?pagina=${pagina}`
            );
            return response.data;
      } catch (error) {
            console.error("Hubo un error al cargar los pagos:", error);
            throw error;
      }
};
