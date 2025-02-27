import { configureStore } from "@reduxjs/toolkit";
import coffeePriceSlice from "./slices/coffeePriceSlice";
import stateSlice from "./slices/stateSlice";
import stateSliceTable from "./slices/stateSliceTable";
import authSlice from "./slices/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage por defectoReducer principal

const persistConfig = {
      key: "auth", // Clave para persistencia
      storage, // Almacenamiento, por defecto localStorage
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
      reducer: {
            precioArroba: coffeePriceSlice,
            estado: stateSlice,
            auth: persistedAuthReducer, // Ahora guarda usuario + token
            estadoTablaGestion: stateSliceTable,
      },
});

export const persistor = persistStore(store);
export default store;
