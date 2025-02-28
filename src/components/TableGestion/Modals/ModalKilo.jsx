import { useDispatch } from "react-redux";
import { actualizarEstado } from "../../../store/slices/stateSlice";
import { registrarKilos } from "../../../api/jornalesApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { showErrorAlert, showSuccessAlert } from "../../Alerts/AlertService";

const ModalKilo = ({ id_asignacion }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    kilos: Yup.number()
      .required("Los kilos son obligatorios *")
      .positive("Debe ser un número positivo")
      .integer("Debe ser un número entero"),
  });

  const initialValues = {
    kilos: "",
  };

  const agregarKilos = async (values, { resetForm }) => {
    const jornal = { kilos: values.kilos, id_asignacion };

    try {
      const response = await registrarKilos(jornal);
      showSuccessAlert(response.message);
      cerrarModal(resetForm);
      dispatch(actualizarEstado());
    } catch (error) {
      showErrorAlert("Error al registrar el jornal!", error.response.data.error);
    }
  };

  const cerrarModal = (resetForm) => {
    resetForm();
    document.getElementById("modal_kilos").close();
  };

  return (
    <dialog id="modal_kilos" className="modal">
      <div className="modal-box max-w-sm p-6 rounded-lg shadow-lg bg-white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={agregarKilos}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-[#1B1B1B] hover:text-[#3F3F3F]"
                onClick={() => cerrarModal(resetForm)}
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold text-[#1B1B1B] mb-4">
                Agregar kilos
              </h3>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#3F3F3F]">
                  Cantidad de kilos
                </label>
                <Field
                  type="number"
                  name="kilos"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
                  placeholder="Kilos"
                />
                <ErrorMessage
                  name="kilos"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
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
};
export default ModalKilo;
