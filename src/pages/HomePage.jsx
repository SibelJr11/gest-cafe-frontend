import React from 'react'
 
 const HomePage = () => {
  const finca = sessionStorage.getItem("nombre_finca");

  const formatearTexto = (texto) => {
    return texto
      .toLocaleLowerCase("es") // Convierte todo a minúsculas respetando caracteres especiales
      .replace(/\b(\p{L})/gu, (letra) => letra.toLocaleUpperCase("es")); // Capitaliza solo la primera letra
  };

    return (
      <div className="relative w-full h-screen">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <img
            src="https://media.istockphoto.com/id/843899022/es/foto/plantaci%C3%B3n-de-caf%C3%A9-en-jerico-colombia.jpg?s=612x612&w=0&k=20&c=OLd79lRwiHzhC3pn842qb2i2XI0Zz_e6U1g1-LgZVT0="
            alt="Café de fondo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
  
        {/* Contenido principal */}
        <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold">¡Bienvenido a Finca Cafetera {formatearTexto(finca)}!</h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl">
         GestCafe. La plataforma diseñada para optimizar la gestión de tu finca cafetera.  
          Controla la producción, administra trabajadores y realiza pagos de forma sencilla y eficiente.
          </p>
        
        </div>
      </div>
    );
  }

export default HomePage;