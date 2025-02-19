import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registrarUsuario } from "../api/usuariosApi";
import { showErrorAlert, showSuccessAlert } from "./Alerts/AlertService";
import { useNavigate } from "react-router-dom";

const SingUpForm = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    rol: Yup.string().required("El tipo de rol es obligatorio *"),
    tipo_documento: Yup.string().required("El tipo de documento es obligatorio *"),
    no_identificacion: Yup.string()
      .required("El número de identificación es obligatorio *")
      .matches(/^[0-9]+$/, "Debe contener solo números *"),
    nombres: Yup.string()
      .required("Los nombres son obligatorios *")
      .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras y espacios *")
      .min(2, "Debe tener al menos 2 caracteres *"),
    apellidos: Yup.string()
      .required("Los apellidos son obligatorios *")
      .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras y espacios *")
      .min(2, "Debe tener al menos 2 caracteres *"),
    celular: Yup.string()
      .required("El número celular es obligatorio *")
      .matches(/^[0-9]+$/, "Debe contener solo números *")
      .min(10, "Debe tener al menos 10 dígitos *")
      .max(10, "Debe tener máximo 10 dígitos *"),
    correo: Yup.string()
      .email("Debe ser un correo válido *")
      .nullable(),
      password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres *')
    .required('La contraseña es obligatoria *')
  });

  const initialValues = {
    no_identificacion: '',
    tipo_documento: '',
    rol: '',
    nombres: '',
    apellidos: '',
    celular: '',
    correo: '',
    password: '',
  };
  
  const guardarUsuario = async (values,{ resetForm }) => {
      try {
                 const response = await registrarUsuario(values);
                 showSuccessAlert(response.message);
                 if(values.rol === 'PROPIETARIO'){
                  localStorage.setItme("propietario",values.no_identificacion);
                   navigate('/register-farm');
                   resetForm();
                 }else{
                  navigate('/');
                   resetForm();
                 }
           } catch (error) {
               showErrorAlert('Hubo un error al registrar el usuario!',error.response.data.error)
           }
  };

  return (
    <div className="card w-5/6 md:w-full max-w-xl shrink-0 shadow-2xl bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={guardarUsuario}
      >
        {({isSubmitting}) => (
          <Form className="card-body">
           <h3 className="text-xl md:text-2xl font-semibold text-[#1B1B1B] mb-2">
              Registro de usuario
            </h3>
             <div className="grid sm:grid-cols-12 md:grid-cols-2 md:gap-2">
              {/* Tipo de Rol */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm  text-[#3F3F3F]">Tipo de usuario </span>
              </label>
              <Field
                as="select"
                name="rol"
                className="select select-bordered  max-w-xs focus:outline-none w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-[#1B1B1B]"
              >
                <option value="" disabled>
                  Seleccione su rol
                </option>
                <option value="CAFICULTOR/PROPIETARIO">CAFICULTOR / PROPIETARIO</option>
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
              </Field>
              <ErrorMessage
                name="rol"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>


            {/* Tipo de Documento */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm  text-[#3F3F3F]">Tipo de documento</span>
              </label>
              <Field
                as="select"
                name="tipo_documento"
                className="select select-bordered  max-w-xs focus:outline-none w-full px-3 py-2 border border-gray-200 rounded-lg  bg-gray-50 text-[#1B1B1B]"
              >
                <option value="" disabled>
                  Tipo
                </option>
                <option value="CÉDULA DE CIUDADANIA">CEDULA DE CIUDADANIA</option>
                <option value="CÉDULA DE EXTRANJERIA">CEDULA DE EXTRANJERIA</option>
                <option value="NIT">NIT</option>
                <option value="NUIP">NUIP</option>
                <option value="PASAPORTE">PASAPORTE</option>
              </Field>
              <ErrorMessage
                name="tipo_documento"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Número de Identificación */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm  text-[#3F3F3F]">Ingrese su número de identificación</span>
              </label>
              <Field
                type="text"
                name="no_identificacion"
                placeholder="No. Identificación"
                className="input input-bordered w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
              />
              <ErrorMessage
                name="no_identificacion"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Nombres */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm  text-[#3F3F3F]">Ingrese sus nombres</span>
              </label>
              <Field
                type="text"
                name="nombres"
                placeholder="Nombres"
                className="input input-bordered w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
              
              />
              <ErrorMessage
                name="nombres"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Apellidos */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm  text-[#3F3F3F]">Ingrese sus apellidos</span>
              </label>
              <Field
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                className="input input-bordered w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
              />
              <ErrorMessage
                name="apellidos"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Celular */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm  text-[#3F3F3F]">Ingrese su número celular</span>
              </label>
              <Field
                type="text"
                name="celular"
                placeholder="Celular"
                className="input input-bordered w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
              />
              <ErrorMessage
                name="celular"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Correo Electrónico */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm  text-[#3F3F3F]">
                  Correo electrónico (Opcional)
                </span>
              </label>
              <Field
                type="email"
                name="correo"
                placeholder="Ingrese su correo electrónico"
                className="input input-bordered w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
              />
              <ErrorMessage
                name="correo"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-sm  text-[#3F3F3F]">
                  Crea una contraseña segura
                </span>
              </label>
              <Field
                type="password"
                name="password"
                className="input input-bordered w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            </div>
            {/* Botón de Enviar */}
            <div className="form-control mt-4">
              <button type="submit" className="btn bg-[#1A4D2E] text-[#F4E3C0] border-none" disable={isSubmitting}>
               {isSubmitting ? 'Registrando...' : 'Registrar'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SingUpForm;
