import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartsReducer from "./slices/cartsSlice";
import categoriesReducer from "./slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        productsStore: productsReducer,
        cartsStore: cartsReducer,
        categoriesStore: categoriesReducer,
    }
})