export interface ReportFormData {
  title: string;
  category: string;
  isImportant: boolean;
  location: string;
  description: string;
  images: File[];
}

export interface Report {
  id: number;
  titulo: string;
  categoria: string;
  ubicacion: string;
  imagenUrl: string;
  estado: "verificado" | "pendiente";
}

export interface UserInfo {
  nombre: string;
  rol: "usuario" | "administrador";
}
