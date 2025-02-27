import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUsuario } from "../api/usuariosApi";
import { showErrorAlert, showSuccessAlert } from "./Alerts/AlertService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/slices/authSlice";


const SingInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    no_identificacion: Yup.string()
      .required("El usuario es obligatorio *")
      .matches(/^[0-9]+$/, "Solo se permiten números *"),
    password: Yup.string()
      .required("La contraseña es obligatoria *")
      .min(6, "La contraseña debe tener al menos 6 caracteres *"),
  });


  // Función de envío del formulario
  const login = async (values, { resetForm }) => {
    try {
        const response = await loginUsuario(values);
        const { usuario, token } = response;
        dispatch(setAuth({usuario,token}));
        const nombresUsuario = response.usuario?.nombres;
        const apellidosUsuario = response.usuario?.apellidos;
        showSuccessAlert(`Bienvenido, ${nombresUsuario+" "+ apellidosUsuario}`,response.message,2000);
        resetForm();
        navigate("/farms");
    } catch (error) {
        showErrorAlert("Hubo un error al iniciar sesión", error.response.data.error);
    }
};




  return (
    <div className="card bg-white w-5/6 md:w-full max-w-sm shrink-0 shadow-2xl ">
      <Formik
        initialValues={{ no_identificacion: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={login}
      >
        {({ isSubmitting }) => (
          <Form className="card-body p-6 md:p-8">
            <div className="flex justify-center">
              <img src="/images/LOGO_GESTCAFE.jpg" className="w-20 sm:w-20 md:w-24" alt="Logo" />
            </div>

            <div className="form-control mt-2 md:mt-4">
            <label className="text-sm mb-1 text-[#3F3F3F]">
                   Ingrese su usuario.
                  </label>
              <Field
                name="no_identificacion"
                type="text"
                placeholder="Usuario"
                className="input input-bordered w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
              />
              <ErrorMessage
                name="no_identificacion"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            
            </div>

            <div className="form-control">
                 <label className="text-sm mb-1 text-[#3F3F3F]">
                   Ingrese su contraseña.
                  </label>
              <Field
                name="password"
                type="password"
                placeholder="Contraseña"
                className="input input-borderedw-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover  text-[#5E5E5E]">
                  ¿Olvidaste tu contraseña?
                </a>
                <br />
                <a
                  href="/register-user"
                  className="label-text-alt link link-hover text-[#5E5E5E]"
                >
                  ¿Eres nuevo? Crea tu usuario
                </a>
              </label>
            </div>

            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn bg-[#1A4D2E] text-[#F4E3C0] border-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Ingresando..." : "Ingresar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SingInForm;
