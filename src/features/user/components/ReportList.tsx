import { FC } from "react";
import { Report } from "../../../types/report";
import { ReportCard } from "./ReportCard";
import "../../../styles/Reports.css";
import { cambiarEstadoReporte } from "../userServices/api";

interface Props {
  reportes: Report[];
  onRefetch: () => void;
  showAdminActions?: boolean;
}

export const ReportList: FC<Props> = ({
  reportes,
  onRefetch,
  showAdminActions = false,
}) => {
  const handleVerificar = async (id: string, nivelImpacto: string) => {
    try {
      await cambiarEstadoReporte(id as any, "VERIFICADO", nivelImpacto);
      onRefetch();
    } catch (err) {
      console.error("Error al verificar:", err);
      alert("Error al verificar el reporte.");
    }
  };

  const handleRechazar = async (id: string, nivelImpacto: string) => {
    try {
      await cambiarEstadoReporte(id as any, "RECHAZADO", nivelImpacto);
      onRefetch();
    } catch (err) {
      console.error("Error al rechazar:", err);
      alert("Error al rechazar el reporte.");
    }
  };

  if (reportes.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", marginTop: "2rem" }}>
        No hay reportes pendientes.
      </p>
    );
  }

  return (
    <div className="report-list">
      {reportes.map((r) => (
        <ReportCard
          key={r.id}
          reporte={r}
          showAdminActions={showAdminActions}
          onVerificar={showAdminActions ? handleVerificar : undefined}
          onRechazar={showAdminActions ? handleRechazar : undefined}
        />
      ))}
    </div>
  );
};