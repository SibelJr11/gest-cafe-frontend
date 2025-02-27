import React from "react";
import { convertirAPesosColombiano } from "../utils/formatter";

const PlanesPage = () => {
  const planes = [
    {
      nombre: "Plan Básico",
      descripcion: "Ideal para fincas pequeñas con pocos administradores.",
      precio: 50000,
      usuarios: "Hasta 2 usuarios",
      bgColor: "bg-gray-200",
    },
    {
      nombre: "Plan Profesional",
      descripcion: "Perfecto para fincas medianas con más empleados y administradores.",
      precio: 100000,
      usuarios: "Hasta 20 usuarios",
      bgColor: "bg-green-500 text-white",
    },
    {
      nombre: "Plan Empresarial",
      descripcion: "Diseñado para grandes fincas con múltiples usuarios y gestión avanzada.",
      precio: 250000,
      usuarios: "Usuarios ilimitados",
      bgColor: "bg-gray-800 text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800">Planes de Suscripción</h1>
      <p className="text-md text-gray-600 mt-2 text-center">
        Todos los planes incluyen las mismas herramientas, pero varían según la cantidad de usuarios.  
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {planes.map((plan, index) => (
          <div key={index} className={`rounded-lg shadow-lg p-6 ${plan.bgColor}`}>
            <h2 className="text-xl font-bold">{plan.nombre}</h2>
            <p className="mt-2">{plan.descripcion}</p>
            <p className="mt-4 text-xl font-semibold">{convertirAPesosColombiano(plan.precio) +"/mes"}</p>
            <p className="mt-2 text-lg font-medium">👥 {plan.usuarios}</p>
            <ul className="mt-4 space-y-2">
              <li>✅ Gestión de cultivos</li>
              <li>✅ Registro de empleados</li>
              <li>✅ Reportes detallados</li>
              <li>✅ Soporte técnico</li>
            </ul>
            <button className="mt-6 w-full bg-white text-green-600 font-semibold py-2 rounded-lg hover:bg-green-100 transition">
              Elegir Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanesPage;
