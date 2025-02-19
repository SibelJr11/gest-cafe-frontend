import axiosInstance from "./axiosIntance";

export const registrarKilos = async (jornal) => {
      try {
            const response = await axiosInstance.post(
                  "/api/jornales",
                  jornal
            );
            return response.data;
      } catch (error) {
            console.error("Error al guardar el jornal:", error);
            throw error;
      }
};
