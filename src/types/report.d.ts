export interface ReportFormData {
  title: string;
  category: string;
  isImportant: boolean;
  location: string;
  description: string;
  images: File[];
  longitud: number,
  latitud: number
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

interface ReportFormProps {
  initialData?: ReportFormData;
  onSubmit: (data: ReportFormData) => void;
  submitButtonText?: string;
  onBack?: () => void;
}

