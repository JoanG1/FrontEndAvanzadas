import React from "react";
import { ReportForm } from "../features/user/components/ReportForm";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const ReportPage: React.FC = () => {
  return (
    <div>
      <h1>Nuevo Reporte</h1>
      <UserProfileIcon />
      <ReportForm onSubmit={(data) => console.log("Creando reporte:", data)}
      submitButtonText="PREVISUALIZAR REPORTE"/>
    </div>
  );
};

export default ReportPage;
