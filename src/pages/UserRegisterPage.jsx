import React from 'react';
import SingUpForm from '../components/SingUpForm';

const FarmRegisterPage = () => {
  
  return (
    <div className="h-full md:h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center" style={{
      backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/052/754/842/small_2x/plantation-of-arabica-bourbon-caturra-and-catuai-coffee-beans-in-guaetmala-photo.jpg")',
    }}
  >
     <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <SingUpForm />

    </div>
  );
};

export default FarmRegisterPage;
