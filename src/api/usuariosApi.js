import axiosInstance from "./axiosIntance";

export const registrarUsuario = async (usuario) => {
      try {
            const response = await axiosInstance.post("/api/usuarios", usuario);
            return response.data;
      } catch (error) {
            console.error("Hubo un error al registrar el usuario:", error);
            throw error;
      }
};

export const loginUsuario = async (credenciales) => {
      try {
            const response = await axiosInstance.post(
                  "/api/usuarios/login",
                  credenciales
            );
            return response.data;
      } catch (error) {
            console.error("Hubo un error al iniciar sesión", error);
            throw error;
      }
};

export const verificarUsuario = async (id_administrador) => {
      try {
            const response = await axiosInstance.get(
                  `/api/usuarios/verificarUsuario/${id_administrador}`
            );
            return response.data;
      } catch (error) {
            console.error("Hubo un error al verificar este usuario", error);
            throw error;
      }
};