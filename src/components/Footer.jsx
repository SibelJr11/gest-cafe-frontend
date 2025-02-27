import React from 'react'

const Footer = () => {
  return (
    <footer className=" text-[#1B1B1B] text-center text-xs py-2 mt-4 ">
            <div className="container mx-auto px-4">
              <p className="uppercase tracking-wide font-semibold">
              Copyright © {new Date().getFullYear()} GestCafé 
              </p>
              <p className="text-[#3F3F3F]">
                Desarrollado por <span className="text-black text-sm font-semibold">Sibel Dev 11</span>
              </p>
              <p className="text-[#5E5E5E] text-xs">Hecho con ❤️ en Colombia</p>
            </div>
          </footer> 
  )
}

export default Footer