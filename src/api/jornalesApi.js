import axiosInstance from "./axiosIntance";

export const registrarKilos = async (jornal) => {
      try {
            const response = await axiosInstance.post("/api/jornales", jornal);
            return response.data;
      } catch (error) {
            console.error("Hubo un error al guardar el jornal", error);
            throw error;
      }
};

export const getHistorialKilosByEmpleado = async (idAsignacion) => {
      try {
            const response = await axiosInstance.get(
                  `/api/jornales/historial-kilos/${idAsignacion}`
            );
            return response.data;
      } catch (error) {
            console.error("Hubo un error al recuperar el historial de kilos", error);
            throw error;
      }
};
