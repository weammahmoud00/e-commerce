import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import categoriesSlice from './categoriesSlice';

export const store=configureStore({
    reducer:{
        counterSlice,
        categoriesSlice,
    }
})