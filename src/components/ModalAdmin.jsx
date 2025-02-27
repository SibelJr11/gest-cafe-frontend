import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { showErrorAlert, showSuccessAlert } from "./Alerts/AlertService";
import { useDispatch } from "react-redux";
import { asignarAdmin } from "../api/fincasApi";
import { verificarUsuario } from "../api/usuariosApi";
import { actualizarEstado } from "../store/slices/stateSlice";


const ModalAdmin = ({finca,dispatch}) => {
  

  const validarUsuarioExistente = async (id_administrador) => {
    if (!id_administrador) return true; // Si no hay ID, pasa la validación (en caso de no asignar administrador)
    try {
        const response = await verificarUsuario(id_administrador);
        return response.existe; // Retorna 'true' si el usuario existe, 'false' si no
    } catch (error) {
        return false; // Si ocurre un error en la API, considera que el usuario no existe
    }
  };

  const validationSchema = Yup.object({
    id_administrador:Yup.string()
    .required("El número de cédula es obligatorio *")
    .matches(/^[0-9]+$/, "Debe contener solo números *")
    .test(
      "checkUsuarioExistente", // Nombre del test
      "El usuario no existe en el sistema *", // Mensaje de error
      async (value) => {
        return await validarUsuarioExistente(value); // Llama a la función de validación
      }
    ),	
  });



  const asignar = async(values,{resetForm}) => {
    try {
        const response = await asignarAdmin(values);
        showSuccessAlert(response.message);
        cerrarModal(resetForm);
        dispatch(actualizarEstado());
     } catch (error) {
        showErrorAlert("Hubo un error al intentar asignar el administrador a la finca:",error.response.data.error)
     };         
  };

  const cerrarModal = (resetForm) =>{
     resetForm();
     document.getElementById("modal_admin").close()
  }



  return (
    <div className="card bg-white w-96 md:w-full max-w-sm shrink-0 shadow-2xl">
      <Formik
        initialValues={{ id_finca: finca.id_finca || "", id_administrador: finca?.id_administrador || "" }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={asignar}
      >
        {({ isSubmitting,resetForm }) => (
          <Form className="card-body p-9 md:p-8">
           <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2  text-[#1B1B1B] hover:text-[#3F3F3F]"     
                  type="button"
               onClick={()=>cerrarModal(resetForm)}
             >
               ✕
             </button>
             <h3 className="text-xl font-semibold  text-[#1B1B1B] mb-2">
              Asignar administrador
              </h3>
   
               {/* Nombre finca*/}
               <div className="form-control">
              <label className="label">
                <span className="text-sm text-[#3F3F3F]">Finca.</span>
              </label>
              <Field
                type="text"
                readOnly
                value={finca.nombre}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none  bg-gray-50 text-[#1B1B1B]"
                />
            
            </div>  

            <div className="form-control">
               <label className="label">
                      <span className="text-sm text-[#3F3F3F]">Ingresa la cédula del administrador.</span>
               </label>
              <Field
                name="id_administrador"
                type="text"
                placeholder="Cédula"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none  bg-gray-50 text-[#1B1B1B]"

              />
              <ErrorMessage
                name="id_administrador"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>



            {/* Botón asignar */}
            <div className="modal-action">
                        <button
                          className="btn bg-[#1A4D2E] text-[#F4E3C0] border-none"
                          type="submit"
                          disabled={isSubmitting}
                        >
                         {isSubmitting ? "Asignando..." : "Asignar"}
                        </button>
                      </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ModalAdmin;
