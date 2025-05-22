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
  imagenUrl?: string;
  ubicacion: string;
  fecha: string;
  usuario: string;
  comentarios: Comentario[];
}
