import { useEffect, useState, useCallback } from "react";
import { getComentariosPorReporte } from "../features/user/userServices/api";
import { Comentario } from "../types/reportFeed";

export const useComentariosPorReporte = (reporteId: string) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchComentarios = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getComentariosPorReporte(reporteId);

      const mapeados: Comentario[] = res.map((c: any) => ({
        id: c.id,
        mensaje: c.contenido,
        fecha: new Date(c.fecha).toLocaleString(),
        usuario: c.idUsuario || "Desconocido",
      }));

      setComentarios(mapeados);
    } catch (error) {
      console.error(`Error cargando comentarios para reporte ${reporteId}:`, error);
    } finally {
      setLoading(false);
    }
  }, [reporteId]);

  useEffect(() => {
    fetchComentarios();
  }, [fetchComentarios]);

  return { comentarios, loading, refetch: fetchComentarios };
};
