import React, { useEffect, useState } from 'react';
import { getFincasPorIdAdministrador, getFincasPorIdPropietario } from '../api/fincasApi';
import {useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FarmsPage = () => {
    const[fincas,setFincas] = useState([]);
    const usuario = useSelector(state => state.auth.usuario);
    const navigate = useNavigate();

    useEffect(() => {
       if(usuario.rol === 'PROPIETARIO'){
        fetchFincasPropietario();
       }else{
        fetchFincasAdministrador();
       }
      }, []);
  
      const fetchFincasPropietario = async () => {
        const response = await getFincasPorIdPropietario(usuario.no_identificacion);
        setFincas(response.data);
      }

      const fetchFincasAdministrador = async () => {
        const response = await getFincasPorIdAdministrador(usuario.no_identificacion);
        setFincas(response.data);
      }



       const guardarIdFincaYRedirigir = (id_finca,nombre) => {
         sessionStorage.setItem('id_finca',id_finca);
         sessionStorage.setItem('nombre_finca',nombre);
         navigate("/home");
       }


  return (
    <div className="h-full md:h-screen flex flex-col bg-white p-4" >
     
       <span className='text-center text-lg md:text-2xl font-semibold text-[#1B1B1B] mt-4'>Mis fincas cafeteras</span>
       <p className="text-sm md:text-md mt-4 text-[#3F3F3F]">Selecciona o haz clic en la finca que deseas gestionar.</p>
       <div className='grid grid-cols-12 place-items-center gap-4 mt-6'>
        {fincas.map((f,index)=>(
        <div
        key={index}
        className="card col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 image-full  shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer rounded-xl"
        onClick={()=>guardarIdFincaYRedirigir(f.id_finca,f.nombre)}
    >
        <figure>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX1uqGu7SZaAtCy1btlDXK8bAW-6TzhdyV-Q&s"
            alt="Shoes"
            className="object-cover h-full w-full"
          />
        </figure>
        <div className="card-body">
              <h2 className="text-md md:text-lg font-semibold text-[#F4E3C0]">
                                        FINCA {f.nombre}
                 </h2>
                 <p className="text-xs font-semibold  text-[#E0D2B8]">
                       ADMINISTRADOR:{" "}
                       {f.id_administrador === null ? (
                            <span className="font-medium">{f.nombres_prop+" "+f.apellidos_prop}</span>
                       ):(
                           <span className="font-medium">{f.nombres_admin+" "+f.apellidos_admin}</span>
                      )}
                       
                 </p>
                 <p className="text-xs font-semibold  text-[#E0D2B8]">
                       UBICACIÓN:{" "}
                       <span className="font-medium">{f.ubicacion}</span>
                 </p>
                 <p className="text-xs font-semibold  text-[#E0D2B8]">
                       HECTÁREAS:{" "}
                       <span className="font-medium">{f.hectareas}</span>
                 </p>
        </div>
      </div>
      
          ))}
           </div>
    </div>
  );
};

export default FarmsPage;
