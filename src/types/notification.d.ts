export interface Notification {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
  tipo?: string;
}

export interface UserInfo {
  nombre: string;
  rol: "usuario" | "administrador";
}