import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  usuario: null,  
  token: null,
};

const authSlice = createSlice({
  name: "auth",  
  initialState,  
  reducers: {
    setAuth: (state, action) => { // Cambiado de "setUsuario" a "setAuth"
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
    },
    clearAuth: (state) => { // Cambiado de "clearUsuario" a "clearAuth"
      state.usuario = null;
      state.token = null;
    }
  },
});

export const { setAuth, clearAuth } = authSlice.actions; 
export default authSlice.reducer;

