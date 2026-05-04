import React from "react";
import { useReportesPendientes } from "../hooks/useReportesPendientes";
import { ReportList } from "../features/user/components/ReportList";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";
import "../styles/Reports.css";

const MisReportesPendientes: React.FC = () => {
  const { reportes, usuario } = useReportesPendientes();

  // refetch vacío porque el ciudadano no puede cambiar estados
  const noop = () => {};

  return (
    <div className="mis-reportes-page">
      <UserProfileIcon />
      <div className="reportes-container">
        <ReportesHeader usuario={usuario} titulo="MIS REPORTES PENDIENTES" />
        <div className="report-feed-wrapper">
          {/* showAdminActions no se pasa → queda false → sin botones */}
          <ReportList reportes={reportes} onRefetch={noop} />
        </div>
      </div>
    </div>
  );
};

export default MisReportesPendientes;
