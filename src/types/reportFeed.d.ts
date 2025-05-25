export interface Comentario {
  id: string;
  usuario: string;
  mensaje: string;
  fecha: string;
  respuestas?: Comentario[];
}

export interface Reporte {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: string;
  eliminado: boolean;
  importante: boolean;
  fecha: string;
  usuario: string;
  ubicacion: string;
  imagenUrl: string;
  comentarios: any[]; // Podrías definir `Comentario[]` si ya tienes el tipo
}

