import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import globalReducer from "./global";

const reducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
});
export const store = configureStore({
  reducer,
});

const { getState, dispatch } = store;

export type RootState = ReturnType<typeof getState>;
export type AppDispatch = typeof dispatch;
