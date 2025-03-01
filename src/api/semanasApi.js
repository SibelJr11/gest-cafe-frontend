import axiosInstance from "./axiosIntance";

export const registrarNuevaSemana = async (semana) => {
      try {
            const response = await axiosInstance.post("/api/semanas", semana);
            return response.data;
      } catch (error) {
            console.error("Hubo un error al guardar la semana:", error);
            throw error;
      }
};

export const traerUltimoIdSemana = async (id_finca) => {
      try {
            const response = await axiosInstance.get(
                  `/api/semanas/${id_finca}`
            );
            return response.data;
      } catch (error) {
            console.error("Hubo un error al recuperar la ultima semana", error);
            throw error;
      }
};

export const finalizarSemana = async (id_semana) => {
      try {
            const response = await axiosInstance.put(
                  `/api/semanas/${id_semana}`
            );
            return response.data;
      } catch (error) {
            console.error("Hubo un error al finalizar la semana:", error);
            throw error;
      }
};
