    import React from "react";
    import { ReportList } from "../features/user/components/ReportList";
    import { ReportesHeader } from "../features/user/components/ReportesHeader";
    import "../styles/Reports.css";
    import { UserProfileIcon } from "../components/ui/UserProfileIcon";
    import { useReportesPendientesAdmin } from "../hooks/useReportesPendientesAdmin";

    const MisReportes: React.FC = () => {
    const { reportes, usuario } = useReportesPendientesAdmin();

    return (
        <div className="mis-reportes-container">
            <UserProfileIcon />
        <ReportesHeader usuario={usuario} titulo={"REPORTES POR REVISION"} />
        <ReportList reportes={reportes} />
        </div>
    );
    };

    export default MisReportes;
