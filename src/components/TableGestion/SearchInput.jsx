import React from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchInput = ({termino,setTermino}) => {
  return (
    <label className="input-sm w-72 mb-2 flex items-center gap-2 border border-gray-300 rounded-lg px-2 py-4 bg-gray-50 ">
  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
         <input type="search"  
             className="bg-transparent focus:outline-none text-sm text-gray-900"
             placeholder="Buscar empleado..."
             value={termino}
             onChange={(e) => setTermino(e.target.value)}/>
</label>

  )
}

export default SearchInput