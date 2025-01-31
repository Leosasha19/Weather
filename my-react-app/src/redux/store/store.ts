import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "../reducers/root.reducer.ts";

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType <typeof rootReducer> //типизация сторов
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"] //типизацция диспачей для запросов