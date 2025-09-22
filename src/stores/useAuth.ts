import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IUser {
  username: string;
  password: string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  login: (user: IUser) => void;
  logout: () => void;
  user: IUser | null;
}

const useAuth = create<IAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user: IUser) => {
        set({ isAuthenticated: true, user });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth",
    },
  ),
);

export default useAuth;
