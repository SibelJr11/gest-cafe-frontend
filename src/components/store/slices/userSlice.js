import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "usuario",  
  initialState: null,  
  reducers: {
    // Acción para establecer el usuario
    setUsuario: (state, action) => {
      return action.payload;
    },
    // Acción para limpiar el estado del usuario
    clearUsuario: () => null,
    
  },
});

export const { setUsuario, clearUsuario } = userSlice.actions; 
export default userSlice.reducer;  
