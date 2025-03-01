import React  from 'react'
import { useSelector } from 'react-redux';
import { convertirAPesosColombiano } from '../../utils/formatter';

const FooterTable = ({empleados}) => {

   const precioArroba = useSelector((state) => state.precioArroba.precio);

    const calcularTotalKilos = () =>{
      return empleados.reduce((acum, total) => acum + Number(total.kilos), 0);
    }

   const calcularTotalPagar = () => {
     const totalKilos = calcularTotalKilos();
     const valorKilo = precioArroba / 12.5; 
     return convertirAPesosColombiano(totalKilos * valorKilo);
   };

  return (
    <div className='text-[#3F3F3F] text-md md:text-lg  font-semibold '>
       <span >
         Total kilos recolectados: {calcularTotalKilos()}
        </span><br/>
        <span>
          Total a pagar:  {calcularTotalPagar()}
        </span>
  
    </div>
  )
}

export default FooterTable;