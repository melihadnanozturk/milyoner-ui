import {configureStore} from "@reduxjs/toolkit";
import gameReducer from "../page/slices/GameSlice";

export const store = configureStore({
    reducer: {
        game: gameReducer
    }
})