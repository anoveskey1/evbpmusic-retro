import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { loadState, saveState } from "./storage";

const preloadedState = loadState();

const store = configureStore({
  reducer: { auth: authReducer },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
