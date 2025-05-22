import { useEffect, useState } from "react";
import { Report, UserInfo } from "../types/report.d";

export const useUserReports = () => {
  const [reportes, setReportes] = useState<Report[]>([]);
  const [usuario, setUsuario] = useState<UserInfo | null>(null);

  useEffect(() => {
    setUsuario({ nombre: "Tatiana Mosquera", rol: "usuario" });
    setReportes([
      {
        id: 1,
        titulo: "TITULO LLAMATIVO DE REPORTE",
        categoria: "Robo",
        ubicacion: "Ubicación exacta",
        imagenUrl: "https://via.placeholder.com/100",
        estado: "verificado",
      },
      {
        id: 2,
        titulo: "TITULO LLAMATIVO DE REPORTE",
        categoria: "Emergencia",
        ubicacion: "Ubicación exacta",
        imagenUrl: "https://via.placeholder.com/100",
        estado: "pendiente",
      },
      {
        id: 3,
        titulo: "TITULO LLAMATIVO DE REPORTE",
        categoria: "Emergencia",
        ubicacion: "Ubicación exacta",
        imagenUrl: "https://via.placeholder.com/100",
        estado: "pendiente",
      },
    ]);
  }, []);

  return { reportes, usuario };
};
