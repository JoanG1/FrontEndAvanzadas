import React from "react";
import { ReportList } from "../features/user/components/ReportList";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import "../styles/Reports.css";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";
import { useReportesRechazados } from "../hooks/useReportesRechazados";
import { useReportesRechazadosAdmin } from "../hooks/useReportesRechazadosAdmin";
import useAuth from "../hooks/useAuth";

const MisReportesRechazados: React.FC = () => {
  const { rol } = useAuth();
  const isAdmin = rol === "ADMINISTRADOR" || rol === "administrador";

  const adminData = useReportesRechazadosAdmin();
  const clienteData = useReportesRechazados();

  const { reportes, usuario } = isAdmin ? adminData : clienteData;
  const refetch = isAdmin ? adminData.refetch : undefined;

  return (
    <div className="mis-reportes-page">
      <UserProfileIcon />
      <div className="reportes-container">
        <ReportesHeader usuario={usuario} titulo={"REPORTES RECHAZADOS"} />
        <div className="report-feed-wrapper">
          <ReportList reportes={reportes} onRefetch={refetch ?? (() => {})} />
        </div>
      </div>
    </div>
  );
};

export default MisReportesRechazados;