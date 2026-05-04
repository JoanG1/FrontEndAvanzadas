import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getUsuarioPorEmail, getUsuarioIdPorEmail, getReportesPorUsuario } from '../features/user/userServices/api';
import { Report, UserInfo } from "../types/report";

export const useReportesPendientes = () => {
  const [reportes, setReportes] = useState<Report[]>([]);
  const [usuario, setUsuario] = useState<UserInfo | null>(null);
  const { email } = useAuth();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        if (!email) return;

        const [idUsuario, usuarioData] = await Promise.all([
          getUsuarioIdPorEmail(email),
          getUsuarioPorEmail(email),
        ]);

        const reportesDelUsuario = await getReportesPorUsuario(idUsuario);

        const pendientes: Report[] = reportesDelUsuario
          .filter((r) => r.estado?.toUpperCase() === "PENDIENTE")
          .map((r) => {
            let id: string;
            if (typeof r.id === "string") {
              id = r.id;
            } else if (r.id?.$oid) {
              id = r.id.$oid;
            } else {
              id = r.id?.$oid ?? r.id?.toString() ?? String(r.id);
            }

            return {
              id,
              titulo: r.titulo,
              descripcion: r.descripcion,
              categoria: r.categoria,
              ubicacion: r.ubicacion?.direccion ?? "Sin dirección",
              estado: r.estado,
              fecha: new Date(r.fechaCreacion).toLocaleString(),
              imagenUrl: r.imagenes?.find((img: string) => img && img.length > 0) ?? "",
              importante: r.importante ?? false,
            };
          });

        setReportes(pendientes);
        setUsuario({
          nombre: usuarioData.mensaje?.nombre ?? email,
          rol: usuarioData.mensaje?.rol ?? "Usuario",
        });
      } catch (err) {
        console.error("Error al cargar reportes pendientes:", err);
      }
    };

    fetchDatos();
  }, [email]);

  return { reportes, usuario };
};