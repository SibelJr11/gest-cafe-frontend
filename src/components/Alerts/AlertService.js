import Swal from "sweetalert2";

export const showSuccessAlert = (title, text, timer = null) => {
      Swal.fire({
          title: title || "¡Éxito!",
          text: text || "Operación realizada correctamente.",
          icon: "success",
          timer: timer, // Si timer es null, no lo usa
          showConfirmButton: !timer // Oculta el botón solo si hay un timer
      });
  };
  

export const showErrorAlert = (title, text) => {
      Swal.fire({
            title: title || "¡Error!",
            text: text || "Ocurrió un problema inesperado.",
            icon: "error",
            
      });
};

export const showConfirmationAlert = async (title, text, icon) => {
      const result = await Swal.fire({
            title: title || "¿Estás seguro?",
            text: text || "Esta acción no se puede deshacer.",
            icon: icon || "succes",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
            allowOutsideClick: false,
      });
      return result.isConfirmed; // Devuelve `true` si el usuario selecciona "Sí"
};

export const showLogoutLoading = async () => {
      Swal.fire({
             title: "Cerrando sesión...",
             text: "Por favor, espera un momento.",
             allowOutsideClick: false,
             didOpen: () => {
                 Swal.showLoading(); // Muestra el loader de carga
             }
         });
}