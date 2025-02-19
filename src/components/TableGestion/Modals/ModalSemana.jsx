import { useDispatch } from "react-redux";
import { actualizarEstado } from "../../store/slices/stateSlice";
import { registrarNuevaSemana } from "../../../api/semanasApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { showErrorAlert, showSuccessAlert } from "../../Alerts/AlertService";

const ModalSemana = ({ hacerVisibleTable }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    fecha_inicio: Yup.date().required("La fecha inicial es obligatoria *"),
    fecha_fin: Yup.date()
      .required("La fecha final es obligatoria *")
      .min(Yup.ref("fecha_inicio"), "La fecha final debe ser posterior a la fecha inicial *"),
  });

  const initialValues = {
    fecha_inicio: "",
    fecha_fin: "",
    id_finca: sessionStorage.getItem("id_finca"),
  };

  const guardarSemana = async (values, { resetForm }) => {
    try {
      const response = await registrarNuevaSemana(values);
      showSuccessAlert(response.message);
      cerrarModal(resetForm);
      dispatch(actualizarEstado());
      hacerVisibleTable();
    } catch (error) {
      showErrorAlert("Error al registrar la semana!", error.response.data.error);
    }
  };

  const cerrarModal = (resetForm) => {
    resetForm();
    document.getElementById("modal_semana").close();
  };

  return (
    <dialog id="modal_semana" className="modal">
      <div className="modal-box max-w-sm p-6 rounded-lg shadow-lg bg-white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={guardarSemana}
          enableReinitialize
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-[#1B1B1B] hover:text-[#3F3F3F]"
                type="button"
                onClick={() => cerrarModal(resetForm)}
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold text-[#1B1B1B] mb-4">
                Nueva semana de trabajo
              </h3>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#3F3F3F]">
                  Fecha de inicio
                </label>
                <Field
                  type="date"
                  name="fecha_inicio"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
                />
                <ErrorMessage
                  name="fecha_inicio"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1 text-[#3F3F3F]">
                  Fecha fin
                </label>
                <Field
                  type="date"
                  name="fecha_fin"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
                />
                <ErrorMessage
                  name="fecha_fin"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  className="btn bg-[#1A4D2E] text-[#E0D2B8] border-none"
                  type="submit"
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

export default ModalSemana;
