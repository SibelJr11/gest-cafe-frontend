import React from "react";

const Header = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-4">
      <div>
        <h2 className="font-semibold text-[#1B1B1B] text-lg lg:text-2xl">
          CPanel GestCafe
        </h2>
        <p className="text-sm md:text-base text-[#3F3F3F] mt-1">
          Administra usuarios y suscripciones de tu plataforma .
        </p>
      </div>
    </div>
  );
};

export default Header;
