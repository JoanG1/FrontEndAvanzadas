import { apiClient } from "../../services/apiClient"; //CONEXION IMPORTADA CON AXIOS
import { User, FormDataRegister } from "../../types/user";


//CONEXION API A SERVICIO DE LOGIN
export async function loginUser(email: string, password: string): Promise<User> { 
  const response = await apiClient.post("/login", { email, password });
  return response.data;
}


//CONEXION API A SERVICIO DE REGISTRO
export async function registerUser (nombre: String, email: String, telefono: String, ciudad: String, direccion: String, password: String ): Promise<FormDataRegister>{
  const response = await apiClient.post("/register", { email, password, telefono, ciudad, direccion, nombre });
  return response.data;
}