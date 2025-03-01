import axiosInstance from "./axiosIntance";

export const registrarAsignacion = async (asignacion) => {
      try {
            const response = await axiosInstance.post(
                  "/api/asignaciones",
                  asignacion
            );
            return response.data;
      } catch (error) {
            console.error("Hubo un error al registrar la asignacion:", error);
            throw error;
      }
};

export const recuperarEmpleadosAsignados = async (id_finca) => {
      try {
            const response = await axiosInstance.get(
                  `/api/asignaciones/${id_finca}`
            );
            return response.data;
      } catch (error) {
            console.error("Hubo un error al mostrar los empleados asignados:", error);
            throw error;
      }
};
