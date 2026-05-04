export interface ReportFormData {
  title: string;
  category: string;
  isImportant: boolean;
  location: string;
  description: string;
  images: File[];
  longitud: number;
  latitud: number;
}

export interface Report {
  id: string;                          // FIX: era number, ahora string (ObjectId de MongoDB)
  titulo: string;
  descripcion?: string;
  categoria: string;
  ubicacion: string;
  imagenUrl: string;
  estado: string;                      // FIX: era union estrecha, ahora string flexible
  fecha?: string;
  importante?: boolean;
  seguidores?: number;                 // NUEVO: contador de seguidores
}

export interface UserInfo {
  nombre: string;
  rol: string;
}

export interface ReportFormProps {
  initialData?: ReportFormData;
  onSubmit: (data: ReportFormData) => void;
  submitButtonText?: string;
  onBack?: () => void;
}