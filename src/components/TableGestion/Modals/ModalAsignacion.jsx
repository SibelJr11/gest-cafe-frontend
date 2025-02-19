import { useDispatch } from "react-redux";
import { actualizarEstado } from "../../store/slices/stateSlice";
import { registrarAsignacion } from "../../../api/asignacionesApi";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { showErrorAlert, showSuccessAlert } from "../../Alerts/AlertService";
import { getEmpleadosByName } from "../../../api/empleadosApi";
import AsyncSelect from "react-select/async";

const ModalAsignacion = ({ id_semana }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    id_empleado: Yup.string().required("El empleado es obligatorio *"),
  });

  const initialValues = {
    id_empleado: "",
    id_semana: id_semana,
  };

  const asignarEmpleado = async (values, { resetForm }) => {
    try {
      const response = await registrarAsignacion(values);
      showSuccessAlert(response.message);
      cerrarModal(resetForm);
      dispatch(actualizarEstado());
    } catch (error) {
      showErrorAlert(
        "Hubo un error al asignar el empleado!",
        error.response.data.error
      );
    }
  };

  const loadEmpleados = async (valor) => {
    try {
      if (!valor) return [];
      const response = await getEmpleadosByName(valor);
      return response.data.map((e) => ({
        value: e.id_empleado,
        label: `${e.nombre} - ${e.id_empleado}`,
      }));
    } catch (error) {
      console.error("Hubo un error al recuperar los empleados.", error);
      return [];
    }
  };

  const cerrarModal = (resetForm) => {
    resetForm();
    document.getElementById("modal_asignacion").close();
  };

  return (
  
      <dialog id="modal_asignacion" className="modal">
        <div className="modal-box max-w-sm p-6 rounded-lg shadow-lg bg-white">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={asignarEmpleado}
          >
            {({ isSubmitting, setFieldValue, resetForm, values }) => (
              <Form>
                {/* Botón cerrar */}
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2  text-[#1B1B1B] hover:text-[#3F3F3F]"     
                  onClick={() => cerrarModal(resetForm)}
                >
                  ✕
                </button>

                <h3 className="text-xl font-semibold text-[#1B1B1B] mb-4">
                  Asignar empleado a semana
                </h3>

                {/* Select de empleados con búsqueda */}
                <div>
                  <label className="block text-sm font-medium text-[#3F3F3F] mb-1">
                    Selecciona un empleado
                  </label>

                  <AsyncSelect
                    placeholder="Buscar empleado..."
                    name="id_empleado"
                    defaultOptions
                    loadOptions={loadEmpleados}
                    onChange={(selectedOption) =>
                      setFieldValue("id_empleado", selectedOption?.value.id_empleado)
                    }
                    noOptionsMessage={() => "No se encontraron empleados"}
                    loadingMessage={() => "Cargando..."}
                    className="border border-gray-200 rounded-lg focus:outline-none  bg-gray-50 text-[#1B1B1B]"
                    value={values.id_empleado}
                  />

                  <ErrorMessage
                    name="id_empleado"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Botón Asignar */}
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="btn bg-[#1A4D2E] text-[#F4E3C0] border-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Asignando..." : "Asignar"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </dialog>
    
  );
};

export default ModalAsignacion;
