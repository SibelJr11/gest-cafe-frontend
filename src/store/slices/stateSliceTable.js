import { createSlice } from "@reduxjs/toolkit";

const stateSliceTable = createSlice({
      name: "estadoTabla",
      initialState: {
            estado: false,
      },
      reducers: {
            actualizarEstado: (state) => {
                  state.estado = !state.estado;
            },
      },
});

export const { actualizarEstado } = stateSliceTable.actions;
export default stateSliceTable.reducer;
