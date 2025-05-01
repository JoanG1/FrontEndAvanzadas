import { useState } from "react";
import { loginUser } from "../features/user/api";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      setUser(user);
      return true;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
