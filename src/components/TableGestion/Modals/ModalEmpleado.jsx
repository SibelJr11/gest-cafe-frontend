import { useDispatch } from "react-redux";
import { actualizarEstado } from "../../../store/slices/stateSlice";
import { registrarNuevoEmpleado } from "../../../api/empleadosApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { showErrorAlert, showSuccessAlert } from "../../Alerts/AlertService";


const ModalEmpleado = ({setTermino}) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/, "Solo se permiten letras y espacios")
      .required("El nombre es obligatorio *"),
  });

  const initialValues = {
    nombre: "",
  };

  const guardarEmpleado = async (values, { resetForm }) => {
    try {
      const response = await registrarNuevoEmpleado(values);
      showSuccessAlert(response.message);  
      cerrarModal(resetForm);
      dispatch(actualizarEstado());
    } catch (error) {
      showErrorAlert("Hubo un error al registrar el empleado!",error.response.data.error); 
    }
  };

  const cerrarModal = (resetForm) =>{
      resetForm();
      setTermino("");
      document.getElementById("modal_empleado").close()
}

  return (
    
      <dialog id="modal_empleado" className="modal">
        <div className="modal-box max-w-sm p-6 rounded-lg shadow-lg bg-white">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={guardarEmpleado}
          >
            {({ isSubmitting,resetForm,handleChange, handleBlur }) => (
              <Form>
                {/* Botón cerrar */}
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2  text-[#1B1B1B] hover:text-[#3F3F3F]"     
                  onClick={() => cerrarModal(resetForm)}
                >
                  ✕
                </button>
                <h3 className="text-xl font-semibold  text-[#1B1B1B] mb-4">
                  Registrar nuevo empleado
                </h3>

                {/* Input de nombre */}
                <div>
                  <label className="block text-sm mb-1  text-[#3F3F3F]">
                    Nombre del empleado
                  </label>
                  <Field
                    type="text"
                    name="nombre"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none  bg-gray-50 text-[#1B1B1B]"
                    placeholder="Nombre"   
                    onChange={(e) => handleChange(e.target.name)(e.target.value.toUpperCase())}
                    onBlur={handleBlur}            
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Botón de Guardar */}
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="btn bg-[#1A4D2E] text-[#F4E3C0] border-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </dialog>
    
  );
}
export default  ModalEmpleado;
