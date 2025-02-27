
export const convertirAPesosColombiano = (numero) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0, // Para evitar decimales
    }).format(numero);
};



// Función para formatear solo la fecha (sin hora)
export const formatearSoloFecha = (fechaISO) => {

    const fecha = new Date(fechaISO);

    const opciones = {
        weekday: 'long', // Día de la semana
        day: 'numeric',  // Día del mes
        month: 'long',   // Nombre del mes
        year: 'numeric', // Año
    };

    return fecha.toLocaleDateString('es-ES', opciones);
};

// Función para formatear fecha con hora
export const formatearFechaConHora = (fechaISO) => {

    const fecha = new Date(fechaISO);

    const opciones = {
        weekday: 'long', // Día de la semana
        day: 'numeric',  // Día del mes
        month: 'long',   // Nombre del mes
        year: 'numeric', // Año
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return fecha.toLocaleDateString('es-ES', opciones);
};


