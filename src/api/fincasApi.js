import axiosInstance from "./axiosIntance";

export const registrarFinca = async (finca) => {
      try {
            const response = await axiosInstance.post("/api/fincas", finca);
            return response.data;
      } catch (error) {
            console.error("Error al registrar la finca.", error);
            throw error;
      }
};

export const getFincasPorIdPropietario = async (id_propietario) => {
      try {
            const response = await axiosInstance.get(
                  `/api/fincas/${id_propietario}`
            );
            return response.data;
      } catch (error) {
            console.error("Error al mostrar las fincas.", error);
            throw error;
      }
};

export const getPagos_KilosByIdFincaYAño = async (idFinca, año) => {
      try {
            const response = await axiosInstance.get(
                  `/api/fincas/${idFinca}/pagos_kilos/${año}`
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Error al mostrar los pagos y kilos de la finca.",
                  error
            );
            throw error;
      }
};

export const getPagos_KilosByIdPropietarioYAño = async (
      no_identificacion,
      año
) => {
      try {
            const response = await axiosInstance.get(
                  `/api/fincas/${no_identificacion}/info_fincas/${año}`
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Error al mostrar los pagos y kilos de las fincas.",
                  error
            );
            throw error;
      }
};

export const asignarAdmin = async (asignacion) => {
      try {
            const response = await axiosInstance.put(
                  `/api/fincas/asignar-admin/${asignacion.id_finca}`,
                  asignacion
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al intentar asignar el administrador a la finca.",
                  error
            );
            throw error;
      }
};

export const editarFinca = async (idFinca, finca) => {
      try {
            const response = await axiosInstance.put(
                  `/api/fincas/editar/${idFinca}`,
                  finca
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al intentar modificar los datos de la finca.",
                  error
            );
            throw error;
      }
};

export const eliminarFinca = async (idFinca) => {
      try {
            const response = await axiosInstance.delete(
                  `/api/fincas/eliminar/${idFinca}`
            );
            return response.data;
      } catch (error) {
            console.error(
                  "Hubo un error al intentar eliminar la finca.",
                  error
            );
            throw error;
      }
};
