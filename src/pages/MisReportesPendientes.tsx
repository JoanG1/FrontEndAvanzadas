    import React from "react";
    import { useReportesPendientes } from "../hooks//useReportesPendientes";
    import { ReportList } from "../features/user/components/ReportList";
    import { ReportesHeader } from "../features/user/components/ReportesHeader";
    import "../styles/Reports.css";
    import { UserProfileIcon } from "../components/ui/UserProfileIcon";

    const MisReportes: React.FC = () => {
    const { reportes, usuario } = useReportesPendientes();

    return (
        <div className="mis-reportes-container">
            <UserProfileIcon />
        <ReportesHeader usuario={usuario} titulo={"MIS REPORTES PENDIENTES"} />
        <ReportList reportes={reportes} />
        </div>
    );
    };

    export default MisReportes;
