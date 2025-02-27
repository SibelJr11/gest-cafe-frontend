import { useState } from "react";
import { editarVenta, registrarVenta } from "../../../api/ventasApi";
import { actualizarEstado } from "../../../store/slices/stateSlice";
import { showErrorAlert, showSuccessAlert } from "../../Alerts/AlertService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Modal para registrar ventas de café
const ModalVenta = ({dispatch,venta,setDataVenta}) => {
       const isEditing = Boolean(venta?.id_venta);

        const validationSchema = Yup.object({
            fecha: Yup.date()
            .required('La fecha es obligatoria *'),  
            cantidad: Yup.number().required('La cantidad es obligatoria *')
            .min(1, 'Debe ser mayor que 0 *'),
            valor: Yup.number().required('La cantidad es obligatoria *')
            .min(1, 'Debe ser mayor que 0 *'),
            tipo_cafe:Yup.string().required('La observación es obligatoria *')             
        });
      
        const initialValues = {
            fecha:venta?.fecha || "",
            cantidad:venta?.cantidad || '',
            valor:venta?.valor || '',
            tipo_cafe:venta?.tipo_cafe || '',
            id_finca:sessionStorage.getItem('id_finca')
      };
      
      const guardarVenta = async (values,{ resetForm }) => {
            try {
                  const response = await registrarVenta(values);
                  showSuccessAlert(response.message);
                  cerrarModal(resetForm); 
                   dispatch(actualizarEstado());
            } catch (error) {
                  showErrorAlert("Hubo un error al registrar la venta!",error.response.data.error)
            }
      };

      const modificarVenta = async (values,{ resetForm }) => {
        try {
              const response = await editarVenta(venta.id_venta,values);
              showSuccessAlert(response.message);
              cerrarModal(resetForm); 
               dispatch(actualizarEstado());
        } catch (error) {
              showErrorAlert("Hubo un error al modificar la venta!",error.response.data.error)
        }
  };

      const cerrarModal = (resetForm) =>{
        setDataVenta({});
        resetForm();
        document.getElementById("modal_venta").close()
       }

       const submitVentas =async(values, { resetForm })=>{
         if (venta) {
           await modificarVenta(values, { resetForm });
         } else {
           await guardarVenta(values, { resetForm });
         }
       };

      return (
            <dialog id="modal_venta" className="modal">
              <div className="modal-box max-w-sm p-6 rounded-lg shadow-lg bg-white">
             
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={submitVentas}
                  enableReinitialize 
                >
                  {({ isSubmitting,resetForm,values}) => (
                    <Form>
                      <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2  text-[#1B1B1B] hover:text-[#3F3F3F]"     
                        type="button"
                        onClick={() => cerrarModal(resetForm)}
                      >
                        ✕
                      </button>
                      <h3 className="text-xl font-semibold  text-[#1B1B1B] mb-4">
                      {isEditing ? 'Modificar datos de la venta' : 'Nueva venta' }
                      </h3>
        
                      {/* Fecha de venta */}
                      <label className="label">
                        <span className="text-sm  text-[#3F3F3F]">
                          Selecciona la fecha de venta de café.
                        </span>
                      </label>
                      <Field
                        type="date"
                        name="fecha"
                        value={values.fecha ? new Date(values.fecha).toISOString().split("T")[0] : ""}
                       className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none  bg-gray-50 text-[#1B1B1B]"  
                      />
                      <ErrorMessage
                        name="fecha"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />

                      {/* Cantidad de café */}
                        <div className="form-control">
                           <label className="label">
                             <span className="text-sm  text-[#3F3F3F]">Ingrese la cantidad de café que vendio.</span>
                           </label>
                           <Field
                             type="number"
                             name="cantidad"
                             value={values.cantidad}
                             placeholder="Cantidad"
                             className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none  bg-gray-50 text-[#1B1B1B]"
                           />
                           <ErrorMessage
                             name="cantidad"
                             component="div"
                             className="text-red-500 text-sm"
                           />
                       </div> 

                       {/* Valor  del café */}
                        <div className="form-control">
                           <label className="label">
                             <span className="text-sm  text-[#3F3F3F]">Ingrese el valor del café vendido.</span>
                           </label>
                           <Field
                             type="number"
                             name="valor"
                             placeholder="Valor"
                             value={values.valor}
                             className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none  bg-gray-50 text-[#1B1B1B]"
                           />
                           <ErrorMessage
                             name="valor"
                             component="div"
                             className="text-red-500 text-sm"
                           />
                       </div>  
                  
                        {/* Tipo de café */}

                      <div className="form-control">
                        <label className="label">
                          <span className="text-sm  text-[#3F3F3F]">Tipo de café vendido.</span>
                        </label>
                        <Field
                          as="select"
                          name="tipo_cafe"
                          className="select select-bordered w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none  bg-gray-50 text-[#1B1B1B]"
                        >
                          <option value="" disabled>
                            Tipo café
                          </option>
                          <option value="CAFÉ VERDE">CAFÉ VERDE</option>
                          <option value="CAFÉ SECO">CAFÉ SECO</option>
                          <option value="PASILLA">PASILLA</option>
                        </Field>
                        <ErrorMessage
                          name="tipo_cafe"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>  
        
                    
        
                      {/* Botón guardar */}
                      <div className="modal-action">
                        <button
                          className="btn bg-[#1A4D2E] text-[#F4E3C0] border-none"
                          type="submit"
                          disabled={isSubmitting}
                        >
                               {isEditing ? (isSubmitting ? "Modificando..." : "Modificar") : (isSubmitting ? "Guardando..." : "Guardar")}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </dialog>
          );
        };
        
        export default ModalVenta;