    import React from "react";
    import { useUserReports } from "../hooks/useUserReports";
    import { ReportList } from "../features/user/components/ReportList";
    import { ReportesHeader } from "../features/user/components/ReportesHeader";
    import "../styles/Reports.css";

    const MisReportes: React.FC = () => {
    const { reportes, usuario } = useUserReports();

    return (
        <div className="mis-reportes-container">
        <ReportesHeader usuario={usuario} />
        <ReportList reportes={reportes} />
        </div>
    );
    };

    export default MisReportes;
