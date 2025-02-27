import axiosInstance from "./axiosIntance";

export const registrarAdelanto = async (adelanto) => {
      try {
            const response = await axiosInstance.post(
                  "/api/adelantos",
                  adelanto
            );
            return response.data;
      } catch (error) {
            console.error("Hubo un error al guardar el adelanto", error);
            throw error;
      }
};

export const getHistorialAdelantosByEmpleado = async (idAsignacion) => {
      try {
            const response = await axiosInstance.get(
                  `/api/adelantos/historial-adelantos/${idAsignacion}`
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al recuperar el historial de adelantos",
                  error
            );
            throw error;
      }
};
