import React from "react";
import { useNavigate } from "react-router-dom";
import { ReportForm } from "../features/user/components/ReportForm";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";
import { ReportFormData } from "../types/report";

const EditReportPage: React.FC = () => {
  const navigate = useNavigate();

  // Simulación de un reporte que ya existe (puedes usar un fetch aquí)
  const reporteExistente: ReportFormData = {
    title: "Robo en parqueadero",
    category: "Incidente",
    isImportant: true,
    location: "Calle 123 #45-67",
    description: "Ocurrió un robo a las 9pm.",
    images: [], // si tienes URLs de imágenes previas puedes adaptarlo
  };

  const actualizarReporte = (data: ReportFormData) => {
    console.log("Actualizando reporte...", data);
    // Aquí podrías enviar `data` a tu backend
  };

  return (
    <div>
      <h1>Editar Reporte</h1>
      <UserProfileIcon />
      <ReportForm
        initialData={reporteExistente}
        onSubmit={actualizarReporte}
        submitButtonText="GUARDAR CAMBIOS"
        onBack={() => navigate("/dashboard")}
      />
    </div>
  );
};

export default EditReportPage;
