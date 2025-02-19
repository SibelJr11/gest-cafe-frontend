import axiosInstance from "./axiosIntance";

export const registrarNuevoEmpleado = async (empleado) => {
      try {
            const response = await axiosInstance.post("/api/empleados", empleado);
            return response.data;
      } catch (error) {
            console.error("Hubo un error al guardar el empleado.", error);
            throw error;
      }
};

export const getEmpleadosByName = async (valor) => {
      try {
            const response = await axiosInstance.get(`/api/empleados/buscar?search=${valor}`);
            return response.data;
      } catch (error) {
            console.error("Hubo un error al recuperar los empleados.", error);
            throw error;
      }
};
