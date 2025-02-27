import { useDispatch, useSelector } from 'react-redux';
import { actualizarPrecioArroba } from '../store/slices/coffeePriceSlice';
import { actualizarEstado } from '../store/slices/stateSlice';
import { convertirAPesosColombiano } from '../utils/formatter';
import { persistor } from '../store/store';
import { clearAuth } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { showLogoutLoading, showSuccessAlert } from './Alerts/AlertService';
import { UserIcon, PowerIcon  } from "@heroicons/react/24/solid";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.auth.usuario);
  const precioEstandar = useSelector((state) => state.precioArroba.precio);
  const finca = sessionStorage.getItem("nombre_finca");

  const handleSelectChange = (e) => {
    const precio = parseInt(e.target.value, 10);
    dispatch(actualizarPrecioArroba(precio));
    dispatch(actualizarEstado());
  };

  const precios = [
    5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 
    10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 
    15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500, 20000
  ];

  const cerrarSesion = () => {
    showLogoutLoading();
    setTimeout(() => {
      sessionStorage.clear();
      dispatch(clearAuth());
      persistor.purge();
      showSuccessAlert("Sesión cerrada", "Has cerrado sesión correctamente.", 2000);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 1500);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <div className="navbar bg-white w-full flex justify-between items-center h-16 drop-shadow-2xl px-3">
        {/* Botón de menú */}
        <div>
          <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <img src="/images/LOGO_GESTCAFE.jpg" alt="Logo GestCafe" className="w-14 md:w-24" />
          </label>
        </div>

        {/* 📍 Nombre de la finca agregado aquí */}
        <div className="text-sm md:text-lg text-start font-semibold text-[#1B1B1B]">
        📍 FINCA {finca}
        </div>

        {/* Selector de precios y usuario */}
        <div className="flex items-center space-x-1">
          <div className="flex flex-col p-2 font-semibold text-[#1B1B1B]">
            <select className="select select-sm w-full text-sm md:text-lg bg-white" onChange={handleSelectChange}>
            <option  value={precioEstandar}>{convertirAPesosColombiano(precioEstandar)}</option>
              {precios.map((precio, index) => (
                <option key={index} value={precio}>{convertirAPesosColombiano(precio)}</option>
              ))}
            </select>
            <span className="text-xs text-center">Precio de la arroba</span>
          </div>

          {/* Menú desplegable de usuario */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar online placeholder">
              <div className="bg-neutral text-white w-12 h-12 flex items-center justify-center rounded-full">
                <span className="text-xl">{getInitials(usuario.nombres)}</span>
              </div>
            </div>
            <ul
               tabIndex={0}
               className="menu menu-sm dropdown-content  bg-white text-[#1B1B1B] rounded-box mt-3 w-44 p-2 shadow z-10"
             >
  <li className="flex items-center ">
    <a>
      <UserIcon className="w-5 h-5 text-[#1A4D2E]" />
      {`${usuario.nombres} ${usuario.apellidos}`}
    </a>
  </li>
  <li className="flex items-center">
  <a onClick={cerrarSesion}>
     <PowerIcon  className="w-5 h-5 text-red-500" />
     Cerrar sesión
    </a>
  </li>
</ul>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
