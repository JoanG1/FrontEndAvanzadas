import { FC } from "react";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import { GenerarReporteForm } from "../features/user/components/GenerarReporteForm";
import "../styles/GenerarReportePage.css";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";
import { useUserReports } from "../hooks/useUserReports";



const GenerarReportePage: FC = () => {

  const { usuario } = useUserReports();

  
  return (
    <div className="generar-reporte-page">
      <div className="generar-reporte-container">
        <UserProfileIcon />
        <ReportesHeader usuario={usuario} titulo="Generación de Reportes" />
        <GenerarReporteForm />
        </div>
    </div>
  );
};

export default GenerarReportePage;
