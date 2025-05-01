import { apiClient } from "../../services/apiClient";
import { User } from "../../types/user";

export async function loginUser(email: string, password: string): Promise<User> {
  const response = await apiClient.post("/login", { email, password });
  return response.data;
}
