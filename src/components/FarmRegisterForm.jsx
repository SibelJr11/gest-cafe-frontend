import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editarFinca, registrarFinca } from "../api/fincasApi";
import { showConfirmationAlert, showErrorAlert, showSuccessAlert } from "./Alerts/AlertService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actualizarEstado } from "../store/slices/stateSlice";

const FarmRegisterForm = ({finca}) => {
  const usuario = useSelector((state) => state.usuario);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ruta= "/register-farm";
  const propietario = localStorage.getItem("propietario");
  const isEditing = Boolean(finca?.id_finca);



const validationSchema = Yup.object({
  nombre: Yup.string()
    .required("El nombre es obligatorio *")
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/, "Solo se permiten letras y espacios")

    .min(2, "Debe tener al menos 2 caracteres *"),
  ubicacion: Yup.string()
    .required("La ubicación es obligatoria *")
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/, "Solo se permiten letras y espacios")

    .min(2, "Debe tener al menos 2 caracteres *"),
  cultivo: Yup.string()
    .required("El tipo de cultivo es obligatorio *")
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/, "Solo se permiten letras y espacios")

    .min(2, "Debe tener al menos 2 caracteres *"),
  hectareas: Yup.string()
    .required("El número de hectáreas es obligatorio *")
    .matches(/^[0-9]+$/, "Debe contener solo números *"),
  
});


  const initialValues = {
    nombre: finca?.nombre || '',
    ubicacion:finca?.ubicacion || '',
    cultivo:finca?.cultivo || '',
    hectareas:finca?.hectareas || '',
    id_propietario: usuario?.no_identificacion  || propietario ,
  };

  const guardarFinca = async (values, { resetForm }) => {
    try {     
      const response = await registrarFinca(values);
      if (location.pathname === ruta) {
          const userWantsToAddMore = await showConfirmationAlert(response.message, '¿Deseas agregar otra finca?','success');  
          resetForm();
           if(!userWantsToAddMore) { //Si el usuario no quiere agregar mas fincas
             localStorage.removeItem("propietario");
             navigate('/');       
           }
      } else {
        showSuccessAlert(response.message);
        cerrarModal(resetForm);
        dispatch(actualizarEstado());    
      }
    } catch (error) {
      showErrorAlert('Hubo un error al intentar registrar la finca.', error.response.data.error);
    }
  };

  const modificarFinca = async (values, { resetForm }) => {
    try {     
      const response = await editarFinca(finca.id_finca,values);
      showSuccessAlert(response.message);
      cerrarModal(resetForm);
      dispatch(actualizarEstado());    
    } catch (error) {
      showErrorAlert('Hubo un error al intentar modificar la finca.', error.response.data.error);
    }
  };


 const submitFincas =async(values, { resetForm })=>{
    if (finca) {
      await modificarFinca(values, { resetForm });
    } else {
      await guardarFinca(values, { resetForm });
 }
};

const cerrarModal = (resetForm) =>{
  resetForm();
  document.getElementById("modal_finca").close();
};
  
  

  return (
    <div className="card bg-white w-5/6 md:w-full max-w-lg  shrink-0 shadow-2xl ">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={submitFincas}
      >
        {({ isSubmitting,resetForm }) => (
          <Form className="card-body">
            {location.pathname !== ruta ? ( 
            <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2  text-[#1B1B1B] hover:text-[#3F3F3F]"               type="button"
               onClick={()=>cerrarModal(resetForm)}
             >
               ✕
             </button>
             ):null}

            <h3 className="text-lg md:text-2xl font-semibold text-[#1B1B1B] mb-2">
              {isEditing ? 'Modificar datos de la finca' : 'Registrar finca' }
            </h3>
   

              {/* Nombre */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm text-[#3F3F3F]">Ingrese el nombre de la finca</span>
                </label>
                <Field
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"

                />
                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Ubicación */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm text-[#3F3F3F]">¿Dónde está ubicada la finca? </span>
                </label>
                <Field
                  type="text"
                  name="ubicacion"
                  placeholder="Ubicación"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"

                />
                <ErrorMessage
                  name="ubicacion"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Cultivo */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm text-[#3F3F3F]">¿Cuál es el cultivo principal?</span>
                </label>
                <Field
                  type="text"
                  name="cultivo"
                  placeholder="Cultivo"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"

                />
                <ErrorMessage
                  name="cultivo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Tamaño */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm  text-[#3F3F3F]">¿Cuántas hectáreas son?</span>
                </label>
                <Field
                  type="text"
                  name="hectareas"
                  placeholder="Tamaño"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 text-[#1B1B1B]"
                />
                <ErrorMessage
                  name="hectareas"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
        

            {/* Botón de Enviar */}
            <div className="form-control mt-4">
              <button type="submit" className="btn bg-[#1A4D2E] text-[#F4E3C0] border-none" disabled={isSubmitting}>
                 {isEditing ? (isSubmitting ? "Modificando..." : "Modificar") : (isSubmitting ? "Registrando..." : "Registrar")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FarmRegisterForm;
