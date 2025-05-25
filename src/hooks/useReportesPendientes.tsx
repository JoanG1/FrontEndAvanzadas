import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getUsuarioIdPorEmail, getReportesPorUsuario } from "../features/user/userServices/api";
import { Report } from "../types/report";
import { UserInfo } from "../types/report";

export const useReportesPendientes = () => {
  const [reportes, setReportes] = useState<Report[]>([]);
  const [usuario, setUsuario] = useState<UserInfo | null>(null);
  const { email } = useAuth();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        if (!email) return;

        const idUsuario = await getUsuarioIdPorEmail(email);
        const reportesDelUsuario = await getReportesPorUsuario(idUsuario);

        const rechazados: Report[] = reportesDelUsuario
          .filter((r) => r.estado?.toUpperCase() === "PENDIENTE")
          .map((r) => ({
            id: r.id?.timestamp ?? r.id?.toString(),
            titulo: r.titulo,
            descripcion: r.descripcion,
            categoria: r.categoria,
            ubicacion: r.ubicacion?.direccion ?? "Sin dirección",
            estado: r.estado,
            fecha: new Date(r.fechaCreacion).toLocaleString(),
            imagenUrl: r.imagenes?.find((img: string) => img && img.length > 0) ?? "",
            importante: r.importante ?? false,
          }));

        setReportes(rechazados);

        setUsuario({
          nombre: email, // o usar otro servicio si quieres el nombre real
          rol: "Usuario",
        });
      } catch (err) {
        console.error("Error al cargar reportes rechazados:", err);
      }
    };

    fetchDatos();
  }, [email]);

  return { reportes, usuario };
};
