    import React from "react";
    import { useReportesRechazados } from "../hooks/useReportesRechazados";
    import { ReportList } from "../features/user/components/ReportList";
    import { ReportesHeader } from "../features/user/components/ReportesHeader";
    import "../styles/Reports.css";
    import { UserProfileIcon } from "../components/ui/UserProfileIcon";

    const MisReportes: React.FC = () => {
    const { reportes, usuario } = useReportesRechazados();

    return (
        <div className="mis-reportes-container">
            <UserProfileIcon />
        <ReportesHeader usuario={usuario} titulo={"MIS REPORTES RECHAZADOS"} />
        <ReportList reportes={reportes} />
        </div>
    );
    };

    export default MisReportes;
