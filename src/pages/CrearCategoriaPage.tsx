import { FC } from "react";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import { CrearCategoriaForm } from "../features/user/components/CrearCategoriaForm";
import { UserInfo } from "../types/report";
import "../styles/CrearCategoriaPage.css";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const mockUsuario: UserInfo = {
  nombre: "Joan Gomez",
  rol: "administrador"
};

const CrearCategoriaPage: FC = () => {
  return (
    <div className="crear-categoria-page">
      <div className="crear-categoria-container">
        <UserProfileIcon />
        <ReportesHeader usuario={mockUsuario} titulo="Creación de Categorías" />
        <CrearCategoriaForm />
      </div>
    </div>
  );
};

export default CrearCategoriaPage;
