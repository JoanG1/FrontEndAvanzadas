import { useEffect, useRef } from "react";
import { useReportes } from "../../../hooks/useReportFeed";
import { ReportCard } from "./ReportFeedCard";

export const ReportFeed = () => {
  const { reportes, loading, refetch, loadMore } = useReportes();
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {reportes.map((reporte) => (
      <ReportCard key={reporte.id} data={reporte} onCommentAdded={refetch} />
      ))}

      {/* Sentinel */}
      <div ref={observerRef} style={{ height: "40px" }}></div>

      {loading && <p style={{ textAlign: "center" }}>Cargando...</p>}
    </div>
  );
};
