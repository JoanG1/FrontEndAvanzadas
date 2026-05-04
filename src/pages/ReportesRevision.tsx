import React from "react";
import { ReportList } from "../features/user/components/ReportList";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import "../styles/Reports.css";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";
import { useReportesPendientesAdmin } from "../hooks/useReportesPendientesAdmin";

const ReportesRevision: React.FC = () => {
  const { reportes, usuario, refetch } = useReportesPendientesAdmin();

  return (
    <div className="mis-reportes-page">
      <UserProfileIcon />
      <div className="reportes-container">
        <ReportesHeader usuario={usuario} titulo={"REPORTES POR REVISIÓN"} />
        <div className="report-feed-wrapper">
          <ReportList reportes={reportes} onRefetch={refetch} showAdminActions={true} />
        </div>
      </div>
    </div>
  );
};

export default ReportesRevision;