import { useEffect, useState, useCallback } from "react";
import { getTodosLosReportes } from "../features/user/userServices/api";
import { Reporte } from "../types/reportFeed";

export const useReportes = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReportes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getTodosLosReportes();

      const mapeados: Reporte[] = res.map((r: any) => ({
        id: r.id,
        titulo: r.titulo,
        descripcion: r.descripcion,
        categoria: r.categoria,
        estado: r.estado,
        eliminado: r.eliminado,
        importante: r.importante,
        fecha: new Date(r.fechaCreacion).toLocaleString(),
        usuario: r.idUsuario || "Usuario desconocido",
        ubicacion: r.ubicacion?.direccion || "Ubicación desconocida",
        imagenUrl: r.imagenes?.find((url: string) => url?.length > 0) || "",
        comentarios: [], // Puedes poblar esto después con otro hook o API
      }));

      setReportes(mapeados);
    } catch (err) {
      console.error("Error al cargar reportes:", err);
      setError("Hubo un problema al cargar los reportes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReportes();
  }, [fetchReportes]);

  const refetch = () => fetchReportes();
  const loadMore = () => {
    // Lógica de paginación futura
  };

  return { reportes, loading, error, refetch, loadMore };
};
