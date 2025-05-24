import { FC } from "react";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import { GenerarReporteForm } from "../features/user/components/GenerarReporteForm";
import { UserInfo } from "../types/report";
import "../styles/GenerarReportePage.css";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const mockUsuario: UserInfo = {
  nombre: "Joan Gomez",
  rol: "administrador"
};

const GenerarReportePage: FC = () => {
  return (
    <div className="generar-reporte-page">
      <div className="generar-reporte-container">
        <UserProfileIcon />
        <ReportesHeader usuario={mockUsuario} titulo="Generación de Reportes" />
        <GenerarReporteForm />
        </div>
    </div>
  );
};

export default GenerarReportePage;
