import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;
