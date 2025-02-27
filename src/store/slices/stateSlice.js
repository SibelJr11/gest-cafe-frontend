import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
      name: "estadoGeneral",
      initialState: {
            estado: false,
      },
      reducers: {
            actualizarEstado: (state) => {
                  state.estado = !state.estado;
            },
      },
});

export const { actualizarEstado } = stateSlice.actions;
export default stateSlice.reducer;
