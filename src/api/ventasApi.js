import axiosInstance from "./axiosIntance";

export const registrarVenta = async (venta) => {
      try {
            const response = await axiosInstance.post("/api/ventas", venta);
            return response.data;
      } catch (error) {
            console.error("Hubo un error al registrar la venta:", error);
            throw error;
      }
};

export const traerVentas = async (id_finca) => {
      try {
            const response = await axiosInstance.get(`/api/ventas/${id_finca}`);
            return response.data;
      } catch (error) {
            console.error("Hubo un error al traer las ventas:", error);
            throw error;
      }
};

export const getInfoVentasCafeSeco = async (id_finca, year) => {
      try {
            const response = await axiosInstance.get(
                  `/api/ventas/cafe-seco/${id_finca}/${year}`
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al mostrar la información de ventas de café seco:",
                  error
            );
            throw error;
      }
};

export const getInfoVentasCafeVerde = async (id_finca, year) => {
      try {
            const response = await axiosInstance.get(
                  `/api/ventas/cafe-verde/${id_finca}/${year}`
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al mostrar la información de ventas de café verde:",
                  error
            );
            throw error;
      }
};

export const getInfoVentasPasilla = async (id_finca, year) => {
      try {
            const response = await axiosInstance.get(
                  `/api/ventas/pasilla/${id_finca}/${year}`
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al mostrar la información de ventas de pasilla:",
                  error
            );
            throw error;
      }
};

export const editarVenta = async (idVenta, venta) => {
      try {
            const response = await axiosInstance.put(
                  `/api/ventas/editar/${idVenta}`,
                  venta
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al intentar modificar los datos de la venta.",
                  error
            );
            throw error;
      }
};
