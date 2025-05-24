import React from "react";
import { useNavigate } from "react-router-dom";
import { ReportForm } from "../features/user/components/ReportForm";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";
import { ReportFormData } from "../types/report";

const ResendReportPage: React.FC = () => {
  const navigate = useNavigate();

  // Simula el reporte que el moderador rechazó
  const reporteRechazado: ReportFormData = {
    title: "Fallo eléctrico en calle 10",
    category: "Incidente",
    isImportant: true,
    location: "Calle 10 con Av. Siempre Viva",
    description: "Hubo una caída de energía a las 7pm.",
    images: [],
    latitud:0,
    longitud:0
  };

  const mensajeModerador =
    "Este reporte fue rechazado por falta de detalles. Por favor agrega más información sobre el lugar exacto y adjunta una imagen clara.";

  const reenviarReporte = (data: ReportFormData) => {
    console.log("Reenviando reporte actualizado...", data);
    // Aquí haces la petición POST/PATCH al backend
  };

  return (
    <div>
      <h1>Reenviar Reporte</h1>
      <UserProfileIcon />

      <div className="moderador-alert" style={{ 
        backgroundColor: "#fff3cd", 
        border: "1px solid #ffeeba", 
        padding: "1rem", 
        marginBottom: "1rem", 
        borderRadius: "0.5rem",
        color: "#856404"
      }}>
        <strong>📢 Observación del moderador:</strong>
        <p>{mensajeModerador}</p>
      </div>

      <ReportForm
        initialData={reporteRechazado}
        onSubmit={reenviarReporte}
        submitButtonText="REENVIAR REPORTE"
        onBack={() => navigate("/dashboard")}
      />
    </div>
  );
};

export default ResendReportPage;
