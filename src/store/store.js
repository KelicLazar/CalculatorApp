import { configureStore } from "@reduxjs/toolkit";
import calcReducer from "./calc-slice";

const store = configureStore({
  reducer: { calc: calcReducer },
});

export default store;
