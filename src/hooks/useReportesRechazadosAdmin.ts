import { useEffect, useState, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import { getReportes, getUsuarioPorEmail } from "../features/user/userServices/api";
import { Report, UserInfo } from "../types/report";

export const useReportesRechazadosAdmin = () => {
  const [reportes, setReportes] = useState<Report[]>([]);
  const [usuario, setUsuario] = useState<UserInfo | null>(null);
  const { email } = useAuth();

  const fetchDatos = useCallback(async () => {
    try {
      if (!email) return;
      const [todos, usuarioData] = await Promise.all([
        getReportes(),
        getUsuarioPorEmail(email),
      ]);

      const rechazados: Report[] = todos
        .filter((r) => r.estado?.toUpperCase() === "RECHAZADO")
        .map((r) => ({
          // FIX: usar $oid para obtener el ObjectId real de MongoDB
          id: r.id?.$oid ?? r.id?.toString() ?? String(r.id),
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
        nombre: usuarioData.mensaje?.nombre ?? email,
        rol: "Administrador",
      });
    } catch (err) {
      console.error("Error al cargar reportes rechazados:", err);
    }
  }, [email]);

  useEffect(() => { fetchDatos(); }, [fetchDatos]);

  return { reportes, usuario, refetch: fetchDatos };
};