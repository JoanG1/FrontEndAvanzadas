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

      // Ordenar por fechaCreacion descendente (más reciente primero) antes de mapear
      const ordenados = [...res].sort((a: any, b: any) => {
        const fechaA = new Date(a.fechaCreacion).getTime();
        const fechaB = new Date(b.fechaCreacion).getTime();
        return fechaB - fechaA;
      });


      const mapeados: Reporte[] = ordenados.map((r: any) => ({
        id: r.id?.$oid ?? r.id?.toString() ?? String(r.id),
        titulo: r.titulo,
        descripcion: r.descripcion,
        categoria: r.categoria,
        estado: r.estado,
        eliminado: r.eliminado,
        importante: r.importante,
        fecha: new Date(r.fechaCreacion).toLocaleString(),
        usuario: r.nombreUsuario || "Usuario desconocido",
        ubicacion: r.ubicacion?.direccion || "Ubicación desconocida",
        imagenUrl: r.imagenes?.find((url: string) => url?.length > 0) || "",
        comentarios: [],
        // FIX: mapear seguidores desde el backend
        seguidores: Array.isArray(r.seguidores) ? r.seguidores.length : (r.seguidores ?? 0),
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
  const loadMore = () => {};

  return { reportes, loading, error, refetch, loadMore };
};