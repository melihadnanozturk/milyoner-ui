import {configureStore} from "@reduxjs/toolkit";
import {setStore} from "../api/apiClient.js";
import gameReducer from "../page/gameplay/slices/GameSlice";
import adminAuthReducer from "../page/panel/slice/AdminAuthSlice.js";
import {panelApi} from "../page/panel/slice/panelApi.js";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        game: gameReducer,
        adminAuth: adminAuthReducer,
        [panelApi.reducerPath]: panelApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(panelApi.middleware),
})

setupListeners(store.dispatch);

setStore(store);