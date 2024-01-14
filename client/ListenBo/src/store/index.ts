import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import globalReducer from "./global";

export const store = configureStore({
  reducer: { auth: authReducer, global: globalReducer },
});

const { getState, dispatch } = store;

export type RootState = ReturnType<typeof getState>;
export type AppDispatch = ReturnType<typeof dispatch>;
