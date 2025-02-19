
export const convertirAPesosColombiano = (numero) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0, // Para evitar decimales
    }).format(numero);
};


export const transformarFecha = (fecha) => {
        const opciones = {
            weekday: 'long', // Día de la semana (opcional)
            day: 'numeric', // Día del mes
            month: 'long', // Nombre completo del mes
            year: 'numeric', // Año
            hour: 'numeric', // Hora
            minute: 'numeric', // Minutos
            hour12: true, // 12 horas (AM/PM)
        }
        
        return fecha.toLocaleDateString('es-ES', opciones);
    };