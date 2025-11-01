import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user"
import categoryReducer from "./slices/category"
import cityReducer from "./slices/city"


export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
        city : cityReducer,
    },
})