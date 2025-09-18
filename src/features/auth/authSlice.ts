import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  username: string;
  password: string;
}

interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
