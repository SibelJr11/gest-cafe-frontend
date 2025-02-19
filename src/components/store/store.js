import { configureStore } from "@reduxjs/toolkit";
import coffeePriceSlice from "./slices/coffeePriceSlice";
import stateSlice from "./slices/stateSlice";
import stateSliceTable from "./slices/stateSliceTable";
import userSlice from "./slices/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage por defectoReducer principal

const persistConfig = {
      key: "user", // Clave para persistencia
      storage, // Almacenamiento, por defecto localStorage
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
      reducer: {
            precioArroba: coffeePriceSlice,
            estado: stateSlice,
            usuario: persistedUserReducer,
            estadoTablaGestion: stateSliceTable,
      },
});

export const persistor = persistStore(store);
export default store;
