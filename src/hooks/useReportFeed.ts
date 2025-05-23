import { useEffect, useState } from "react";
import { obtenerReportes } from "../features/user/apiReport";
import { Reporte } from "../types/reportFeed";

const PAGE_SIZE = 2;

export function useReportes() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const all = await obtenerReportes();
    const slice = all.slice(0, page * PAGE_SIZE);
    setReportes(slice);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const refetch = () => {
    setPage(1);
    fetchData();
  };

  return { reportes, loading, refetch, loadMore };
}
