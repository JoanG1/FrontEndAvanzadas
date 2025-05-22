import { Reporte } from "../../types/reportFeed";

let mockReportes: Reporte[] = [
  {
    id: "1",
    titulo: "GRIETAS EN AVENIDA CENTENARIO",
    descripcion: "Presencia de ciertas grietas por la avenida centenario al lado del edificio horeb...",
    imagenUrl: "",
    ubicacion: "Calle 24 N # 5 -07",
    fecha: "5/07/24",
    usuario: "LUISgol",
    comentarios: [
      {
        id: "c1",
        usuario: "PepitoPerez89",
        mensaje: "Sí es cierto, la semana pasada me caí en el lugar",
        fecha: "5/03/24",
        respuestas: [],
      },
      {
        id: "c2",
        usuario: "SantiGO123",
        mensaje: "Creo que ya los arreglaron",
        fecha: "5/06/24",
        respuestas: [],
      },
    ]
  },
  {
    id: "2",
    titulo: "SEMAFORO DAÑADO EN LA AV. PRINCIPAL",
    descripcion: "El semáforo de la esquina con la tienda El Sol no cambia a verde.",
    imagenUrl: "",
    ubicacion: "Av. Principal con Calle 12",
    fecha: "5/05/24",
    usuario: "CARLITOS21",
    comentarios: []
  }
];

export async function obtenerReportes(): Promise<Reporte[]> {
  return new Promise((res) => setTimeout(() => res(mockReportes), 500));
}

export async function comentarReporte(reporteId: string, mensaje: string) {
  const comentario = {
    id: crypto.randomUUID(),
    usuario: "UsuarioMock",
    mensaje,
    fecha: new Date().toLocaleDateString("es-CO"),
    respuestas: []
  };

  const reporte = mockReportes.find(r => r.id === reporteId);
  if (reporte) {
    reporte.comentarios.push(comentario);
  }

  return new Promise((res) => setTimeout(() => res(true), 300));
}
