import React from "react";
import { useUserReports } from "../hooks/useUserReports";
import { ReportList } from "../features/user/components/ReportList";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";
import "../styles/Reports.css";

const MisReportes: React.FC = () => {
  const { reportes, usuario } = useUserReports();

  return (
    <div className="mis-reportes-page">
      <UserProfileIcon />
      <div className="reportes-container">
        <ReportesHeader usuario={usuario} titulo="MIS REPORTES" />
        <div className="report-feed-wrapper">
          <ReportList reportes={reportes} />
        </div>
      </div>
    </div>
  );
};

export default MisReportes;
