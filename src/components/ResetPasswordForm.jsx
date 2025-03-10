import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetPasswordUsuario } from "../api/usuariosApi";
import { showErrorAlert, showSuccessAlert } from "./Alerts/AlertService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    no_identificacion: Yup.string()
    .required("El usuario es obligatorio *")
    .matches(/^[0-9]+$/, "Solo se permiten números *"),
    password: Yup.string()
      .required("La contraseña es obligatoria *")
      .min(6, "Debe tener al menos 6 caracteres *"),
  });

  const resetPassword = async (values, { resetForm }) => {
    try {
      const response = await resetPasswordUsuario(values.no_identificacion,values);
      showSuccessAlert(response.message);
      resetForm();
      navigate("/");
    } catch (error) {
      showErrorAlert("Hubo un error al registrar una nueva contraseña", error.response?.data?.error || error.response?.data?.message);
    }
  };

  return (
    <div className="card bg-white w-5/6 md:w-full max-w-sm shadow-2xl p-6 md:p-8">
      <Formik
        initialValues={{ no_identificacion:"",password: "" }}
        validationSchema={validationSchema}
        onSubmit={resetPassword}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex justify-center">
              <img src="/images/LOGO_GESTCAFE.jpg" className="w-20 sm:w-20 md:w-24" alt="Logo" />
            </div>
              <h2 className="text-lg font-semibold text-[#1B1B1B] mt-2">Restablecer Contraseña</h2>
            <div className="form-control mt-2 md:mt-3">
                        <label className="text-sm mb-1 text-[#3F3F3F]">
                               Ingrese su número de identificación.
                           </label>
                          <Field
                            name="no_identificacion"
                            type="text"
                            placeholder="Usuario"
                            className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
                          />
                          <ErrorMessage
                            name="no_identificacion"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        
                        </div>


            <div className="form-control mt-2 relative">
            <label className="text-sm mb-1 text-[#3F3F3F]">
            Ingresa una nueva contraseña segura para recuperar el acceso a tu cuenta.
             </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B] pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-[#3F3F3F]  hover:text-[#1B1B1B]"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="form-control mt-4">
              <button type="submit" className="btn bg-[#1A4D2E] text-[#F4E3C0] border-none" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
