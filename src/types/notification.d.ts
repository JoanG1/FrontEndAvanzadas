export interface Notification {
  id: number;
  titulo: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
}

export interface UserInfo {
  nombre: string;
  rol: "usuario" | "administrador";
}
