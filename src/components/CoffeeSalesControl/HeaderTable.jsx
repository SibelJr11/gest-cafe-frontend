import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const HeaderTable = () => {


 return (
            <div className="w-full flex justify-between mb-6">
                  <div>
                        <h2 className="font-semibold  text-[#1B1B1B] text-lg lg:text-2xl">
                              Ventas de café
                        </h2>
                  </div>
                  <div className="flex gap-2">     
                    <button
                      className="btn btn-sm text-xs sm:btn-sm lg:btn-md bg-[#1A4D2E] text-[#F4E3C0] border-none flex items-center gap-2"
                      onClick={() => document.getElementById("modal_venta").showModal()}
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      Nueva venta
                    </button>

                  </div>
            </div>
      );
};

export default HeaderTable;
