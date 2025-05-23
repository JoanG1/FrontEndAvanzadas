    import React from "react";
    import { useUserReports } from "../hooks/useUserReports";
    import { ReportList } from "../features/user/components/ReportList";
    import { ReportesHeader } from "../features/user/components/ReportesHeader";
    import "../styles/Reports.css";
    import { UserProfileIcon } from "../components/ui/UserProfileIcon";

    const MisReportes: React.FC = () => {
    const { reportes, moderador } = useUserReports();

    return (
        <div className="mis-reportes-container">
            <UserProfileIcon />
        <ReportesHeader usuario={moderador} titulo={"REPORTES POR REVISION"} />
        <ReportList reportes={reportes} />
        </div>
    );
    };

    export default MisReportes;
