import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.example.com", //CAMBIAR POR LA RUTA DE NUESTRO BACKEND "LOCALHOST:8080 (DESARROLLO)"
  headers: {
    "Content-Type": "application/json"
  }
});
