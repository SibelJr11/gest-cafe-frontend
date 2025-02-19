import React from "react";

const HeaderTable = () => {


 return (
            <div className="w-full flex justify-between mb-6">
                  <div>
                        <h2 className="font-semibold  text-[#1B1B1B] text-lg lg:text-2xl">
                              Gestión de ventas de café
                        </h2>
                  </div>
                  <div className="flex gap-2">     
                        <button
                              className="btn btn-sm text-xs sm:btn-sm lg:btn-md bg-[#1A4D2E] text-[#F4E3C0] border-none "
                              onClick={() =>
                                    document
                                          .getElementById("modal_venta")
                                          .showModal()
                              }
                        >
                               Nueva venta
                        </button>
                  </div>
            </div>
      );
};

export default HeaderTable;
