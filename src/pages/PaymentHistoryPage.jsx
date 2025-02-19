import React, { useEffect, useState } from 'react';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { buscarTodosPagos } from '../api/pagosApi';
import { useSelector } from 'react-redux';
import { convertirAPesosColombiano, transformarFecha } from '../utils/formatter';

const PaymentHistoryPage = () => {
    const [pagos, setPagos] = useState([]);
    const [pagina, setPagina] = useState(1); // Página actual
    const [totalPaginas, setTotalPaginas] = useState(1); // Total de páginas disponibles
    const [cargando, setCargando] = useState(false); // Estado para saber si estamos cargando más pagos
    const estado = useSelector((state) => state.estado);
    const id_finca = sessionStorage.getItem("id_finca");

    const fetchTodosPagos = async () => {
      
        setCargando(true);
        try {
            const response = await buscarTodosPagos(id_finca, pagina);
            setPagos([...pagos, ...response.data]);
            setTotalPaginas(response.totalPaginas); // Total de páginas
        } catch (error) {
            console.error("Error al cargar los pagos:", error);
        } finally {
            setCargando(false);
        }
    };

    // Cargar pagos cuando cambie la página
    useEffect(() => {
        fetchTodosPagos();
    }, [pagina]);



    return (
        <div className="card w-auto shadow-xl bg-white p-6">
            <h1 className="text-lg md:text-2xl font-semibold text-[#1B1B1B] mb-4">Historial de Pagos</h1>
            <div className="space-y-4">
                {pagos.map((p) => (
                    <div
                        key={p.id_pago}
                        className="flex items-center justify-between p-4 bg-[#c4f4be] rounded-xl shadow-md"
                    >
                        <div className="flex items-center space-x-4">
                            <CalendarIcon className="h-10 w-10 text-[#1A4D2E]" />
                            <div>
                                <h2 className="text-md md:text-lg font-semibold text-[#3F3F3F]">{p.empleado}</h2>
                                <p className="text-xs md:text-sm text-[#5E5E5E]">{transformarFecha(new Date(p.fecha))}</p>
                                <p className="text-xs md:text-sm text-[#5E5E5E]">{p.observacion}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-md md:text-lg font-bold text-[#1B1B1B]">
                                {convertirAPesosColombiano(p.valor)}
                            </span>
                            <span
                                className={"mt-1 px-2 py-1 text-xs md:text-sm rounded-lg bg-[#2E7D32] text-[#F4E3C0] font-semibold"}
                            >
                                Pagado
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Mostrar el botón solo si hay más páginas */}
            {pagina < totalPaginas && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setPagina(pagina + 1)}
                        className="px-4 py-2 bg-[#1A4D2E] text-[#F4E3C0] rounded-lg"
                        disabled={cargando} // Desactivar mientras se carga
                    >
                        {cargando ? "Cargando..." : "Ver más"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentHistoryPage;
