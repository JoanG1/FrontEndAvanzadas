import { FC } from "react";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import { CrearCategoriaForm } from "../features/user/components/CrearCategoriaForm";
import "../styles/CrearCategoriaPage.css";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";
import { useUserReports } from "../hooks/useUserReports";

const CrearCategoriaPage: FC = () => {
  const { usuario } = useUserReports();

  return (
    <div className="crear-categoria-page">
      <UserProfileIcon />
      <div className="crear-categoria-container">
        <ReportesHeader usuario={usuario} titulo="Creación de Categorías" />
        <CrearCategoriaForm />
      </div>
    </div>
  );
};

export default CrearCategoriaPage;
