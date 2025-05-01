import { create } from "zustand";
import { User } from "../types/user";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void; // 👈 Aquí está el fix
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
