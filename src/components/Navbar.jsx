import { useDispatch, useSelector } from 'react-redux';
import { actualizarPrecioArroba } from './store/slices/coffeePriceSlice';
import  {actualizarEstado} from './store/slices/stateSlice'
import { convertirAPesosColombiano } from '../utils/formatter';
import { persistor } from './store/store';
import { clearUsuario } from './store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { showLogoutLoading, showSuccessAlert } from './Alerts/AlertService';


const Navbar=()=> {
  
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const usuario=useSelector(state=>state.usuario);

      const handleSelectChange = (e) => {
        const precio = parseInt(e.target.value, 10); // Convierte el valor a número
        dispatch(actualizarPrecioArroba(precio)); // Despacha la acción de Redux
        dispatch(actualizarEstado());
      };

      const precios = [5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500, 20000];

const cerrarSesion = () => {
      showLogoutLoading(); //Muestra una alerta de carga
    setTimeout(() => {
        sessionStorage.clear();
        dispatch(clearUsuario()); // Borra la sesión en Redux
        persistor.purge(); // Borra los datos persistidos en Redux Persist
        showSuccessAlert("Sesión cerrada", "Has cerrado sesión correctamente.", 2000);
        setTimeout(() => {
            navigate("/"); 
        }, 2000);
    }, 1500);
};

  return (
    <>
       <div className="navbar bg-white w-full flex justify-between items-center h-16 z">
      <div className="md:invisible">
      <img src="/images/LOGO_GESTCAFE.jpg" alt="Logo GestCafe" className="w-14" />
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>

      <div>
        <div>
       
        <select className="select select-sm md:select-md w-full text-sm md:text-lg bg-white text-[#1B1B1B]" onChange={handleSelectChange}>
          {precios.map((precio, index) => (
            <option key={index} value={precio}>{convertirAPesosColombiano(precio)}</option>
          ))}
        </select>
        </div>
        <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Usuario"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  bg-white text-[#1B1B1B] rounded-box  mt-3 w-52 p-2 shadow z-96">
            <li><a>{`${usuario.nombres} ${usuario.apellidos}`}</a></li>
            <li><a onClick={cerrarSesion}>Cerrar sesión</a></li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
