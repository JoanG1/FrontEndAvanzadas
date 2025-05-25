// src/components/moderator/ModeratorDashboardPanel.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { ReportesHeader } from "./ReportesHeader";
import "../../../styles/ModeratorDashboard.css";
import { useUserReports } from "../../../hooks/useUserReports";
import { UserProfileIcon } from "../../../components/ui/UserProfileIcon";

export const ModeratorDashboardPanel: React.FC = () => {
  const navigate = useNavigate();

  const { usuario } = useUserReports();

  return (
    <div className="moderador-container">
      <UserProfileIcon />
      <ReportesHeader usuario={usuario} titulo={"PANEL MODERADOR"} />

      <div className="acciones-moderador">
        <button onClick={() => navigate("/reportes-revision")}>
          REVISION DE REPORTES
        </button>
        <button onClick={() => navigate("/Crear-categoria")}>
          CREAR CATEGORIA
        </button>
        <button onClick={() => navigate("/generar-reporte")}>
          GENERACION DE INFORMES
        </button>
      </div>
    </div>
  );
};
