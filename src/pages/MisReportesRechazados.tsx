    import React from "react";
    import { useUserReports } from "../hooks/useUserReports";
    import { ReportList } from "../features/user/components/ReportList";
    import { ReportesHeader } from "../features/user/components/ReportesHeader";
    import "../styles/Reports.css";
    import { UserProfileIcon } from "../components/ui/UserProfileIcon";

    const MisReportes: React.FC = () => {
    const { reportes, usuario } = useUserReports();

    return (
        <div className="mis-reportes-container">
            <UserProfileIcon />
        <ReportesHeader usuario={usuario} titulo={"MIS REPORTES RECHAZADOS"} />
        <ReportList reportes={reportes} />
        </div>
    );
    };

    export default MisReportes;
