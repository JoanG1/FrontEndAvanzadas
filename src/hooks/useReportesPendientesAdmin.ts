import { useEffect, useState, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import { getReportesPendientes, getUsuarioPorEmail } from '../features/user/userServices/api';
import { Report, UserInfo } from "../types/report";

export const useReportesPendientesAdmin = () => {
  const [reportes, setReportes] = useState<Report[]>([]);
  const [usuario, setUsuario] = useState<UserInfo | null>(null);
  const { email } = useAuth();

  const fetchDatos = useCallback(async () => {
    try {
      if (!email) return;
      const [todos, usuarioData] = await Promise.all([
        getReportesPendientes(),
        getUsuarioPorEmail(email),
      ]);
      const pendientes: Report[] = todos.map((r) => {
        console.log("ID tipo:", typeof r.id, "valor:", JSON.stringify(r.id));
        return {
          id: r.id?.$oid ?? r.id?.toString() ?? String(r.id),
          titulo: r.titulo,
          descripcion: r.descripcion,
          categoria: r.categoria,
          ubicacion: r.ubicacion?.direccion ?? "Sin dirección",
          estado: r.estado,
          fecha: new Date(r.fechaCreacion).toLocaleString(),
          imagenUrl: r.imagenes?.find((img: string) => img && img.length > 0) ?? "",
          importante: r.importante ?? false,
          seguidores: r.seguidores?.length ?? 0,
        };
      });
      setReportes(pendientes);
      setUsuario({
        nombre: usuarioData.mensaje?.nombre ?? email,
        rol: "Administrador",
      });
    } catch (err) {
      console.error("Error al cargar reportes pendientes:", err);
    }
  }, [email]);

  useEffect(() => { fetchDatos(); }, [fetchDatos]);
  return { reportes, usuario, refetch: fetchDatos };
};