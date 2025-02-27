import { useEffect } from "react";

const FacebookNews = () => {
  useEffect(() => {
    console.log("Ejecutando useEffect para cargar el SDK de Facebook...");
  
    // Verifica si el SDK ya está cargado
    if (window.FB) {
      console.log("El SDK de Facebook ya está cargado. Parseando contenido...");
      window.FB.XFBML.parse();
      return;
    }
  
    console.log("El SDK de Facebook no está cargado. Agregando script...");
  
    // Insertar el SDK de Facebook dinámicamente
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v22.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
  
    script.onload = () => {
      console.log("El script del SDK de Facebook se ha cargado correctamente.");
      if (window.FB) {
        console.log("Inicializando y parseando el contenido...");
        window.FB.XFBML.parse();
      } else {
        console.error("Error: window.FB no está definido después de la carga del script.");
      }
    };
  
    document.body.appendChild(script);
    console.log("Script insertado en el DOM.");
  }, []);
  

  return (
    <div className="w-full bg-green-500">
      <div id="fb-root"></div>
      <div className="fb-page w-full"
        data-href="https://www.facebook.com/fedecafeteros"
        data-tabs="timeline,events,messages"
       // data-width=""
        data-height="700"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true">
        <blockquote cite="https://www.facebook.com/fedecafeteros" className="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/fedecafeteros">Federación Nacional de Cafeteros de Colombia</a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookNews;
