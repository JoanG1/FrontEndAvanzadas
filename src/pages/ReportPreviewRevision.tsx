import React from "react";
import { ReportPreviewCard } from "../features/user/components/ReportPreviewCard";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const ReportPreviewPage: React.FC = () => {
  const handleCreate = () => {
    console.log("Validar reporte...");
    // lógica para crear reporte
  };

  const handleReject = () => {
    console.log("Rechazar reporte...");
    // lógica para rechazo
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center text-white px-4">
      <UserProfileIcon />
      <ReportPreviewCard
        title="Grietas en Avenida Centenario"
        imageSrc="/placeholder-image.svg"
        category="Infraestructura"
        description="Presencia de ciertas grietas por la avenida centenario al lado del edificio Horeb y también se presentan cerca de la rotonda del Calima con salida hacia las clínicas. Tener cuidado pues podrían causar un accidente."
        location="Calle 24 N # 5 -07"
        primaryLabel="VALIDAR"
        onPrimaryAction={handleCreate}
        secondaryLabel="RECHAZAR"
        onSecondaryAction={handleReject}
        showSecondaryAction={true}
        showArrows={true}
      />
    </div>
  );
};

export default ReportPreviewPage;
