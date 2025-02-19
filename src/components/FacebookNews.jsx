import React, { useEffect } from 'react'

const FacebookNews = () => {

    useEffect(() => {
        if (window.FB) {
          window.FB.XFBML.parse(); // Recarga el SDK de Facebook
        }
      }, []);

  return (
    <div className="fb-page" 
         data-href="https://www.facebook.com/fedecafeteros" 
         data-tabs="timeline" 
         data-width="" 
         data-height="" 
         data-small-header="false" 
         data-adapt-container-width="true" 
         data-hide-cover="false" 
         data-show-facepile="true">
            <blockquote cite="https://www.facebook.com/fedecafeteros" className="fb-xfbml-parse-ignore">
                 <a href="https://www.facebook.com/fedecafeteros">Federación Nacional de Cafeteros de Colombia</a>
           </blockquote>
    </div>
  )
}

export default FacebookNews