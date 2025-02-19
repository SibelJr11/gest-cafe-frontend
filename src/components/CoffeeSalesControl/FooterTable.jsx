import React  from 'react'
import { useSelector } from 'react-redux';
import { convertirAPesosColombiano } from '../../utils/formatter';

const FooterTable = ({empleadosAsig}) => {

   const precioArroba = useSelector((state) => state.precioArroba.precio);

    const calcularTotalKilos = () =>{
      return empleadosAsig.reduce((acum, total) => acum + total.kilos, 0);
    }

   const calcularTotalPagar = () => {
     const totalKilos = calcularTotalKilos();
     const valorKilo = precioArroba / 12.5; 
     return convertirAPesosColombiano(totalKilos * valorKilo);
   };

  return (
    <div className='text-gray-900 text-lg  font-bold '>
       <span className="text-gray-900">
         Total kilos recolectados: {calcularTotalKilos()}
        </span><br/>
        <span className="text-gray-900">
          Total a pagar:  {calcularTotalPagar()}
        </span>
  
    </div>
  )
}

export default FooterTable;