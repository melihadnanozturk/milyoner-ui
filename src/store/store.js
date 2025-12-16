import {configureStore} from "@reduxjs/toolkit";
import {setStore} from "../api/apiClient.js";
import gameReducer from "../page/gamePlay/slices/GameSlice";
import adminAuthReducer from "../page/panel/slice/AdminAuthSlice.js";

export const store = configureStore({
    reducer: {
        game: gameReducer,
        adminAuth: adminAuthReducer
    }
})

setStore(store);