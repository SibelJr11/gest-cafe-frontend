import { createSlice } from "@reduxjs/toolkit";

const coffeePriceSlice = createSlice({
      name: "precioArroba",
      initialState: {
            precio: 0,
      },
      reducers: {
            actualizarPrecioArroba: (state, action) => {
                  state.precio = action.payload;
            },
      },
});

export const { actualizarPrecioArroba } = coffeePriceSlice.actions;
export default coffeePriceSlice.reducer;
