import React from 'react';
import SingUpForm from '../components/SingUpForm';

const UserRegisterPage = () => {
  return(
  
  <div
  className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center relative"
  style={{
    backgroundImage:
      'url("https://static.vecteezy.com/system/resources/thumbnails/052/754/842/small_2x/plantation-of-arabica-bourbon-caturra-and-catuai-coffee-beans-in-guaetmala-photo.jpg")',
  }}
>
  {/* Overlay corregido */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Contenedor del formulario con relative para que no quede oculto */}
  
    <SingUpForm />
  </div>

);
};

export default UserRegisterPage;
