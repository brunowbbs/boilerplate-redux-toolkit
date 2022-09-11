import { configureStore } from "@reduxjs/toolkit";
import { ProductsReducer } from "./Product.slice";
import { UserReducer } from "./User.slice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    products: ProductsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
