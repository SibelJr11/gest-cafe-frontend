import Swal from "sweetalert2";
import axiosInstance from "./axiosIntance";

export const registrarSuscripcion = async (suscripcion) => {
      try {
            const response = await axiosInstance.post(
                  "/api/suscripciones",
                  suscripcion
            );
            return response.data;
      } catch (error) {
            console.error("Hubo un error al registrar la suscripción!", error);
            throw error;
      }
};

export const editarSuscripcion = async (idSuscripcion, suscripcion) => {
      try {
            const response = await axiosInstance.put(
                  `/api/suscripciones/editar/${idSuscripcion}`,
                  suscripcion
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al intentar modificar los datos de la suscripción.",
                  error
            );
            throw error;
      }
};

//Registra el pago a la suscripcion
export const registrarPagoSuscripcion = async (suscripcion) => {
      try {
            const response = await axiosInstance.post(
                  "/api/pagos-suscripcion",
                  suscripcion
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al registrar el pago de la suscripción.",
                  error
            );
            throw error;
      }
};

export const getHistorialPagosSuscripcion = async (idSuscripcion) => {
      try {
            const response = await axiosInstance.get(
                  `/api/pagos-suscripcion/historial/${idSuscripcion}`
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al recuperar los pagos de la suscripción.",
                  error
            );
            throw error;
      }
};
