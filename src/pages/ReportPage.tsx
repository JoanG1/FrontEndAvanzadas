import React from "react";
import { useLocation } from "react-router-dom";
import { ReportForm } from "../features/user/components/ReportForm";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const ReportPage: React.FC = () => {
  const location = useLocation();
  const state = location.state || {};

  const { latitud, longitud, location: direccion } = state;

  console.log(latitud+" "+longitud);

  const initialData = {
    title: "",
    category: "",
    isImportant: false,
    location: direccion || "",
    description: "",
    images: [],
    latitud: Number(latitud),
    longitud: Number(longitud)
  };

  return (
    <div>
      <UserProfileIcon />
      <ReportForm initialData={initialData} />
    </div>
  );
};

export default ReportPage;
