import React from "react";
import { EditarUsuarioForm } from "../features/user/components/EditarUsuarioForm";
import "../styles/EditarUsuario.css";

const EditarUsuario: React.FC = () => {
  return (
    <div className="editar-usuario-page">
      <div className="editar-usuario-wrapper">
        <h1 className="editar-usuario-title">Edición de información</h1>
        <EditarUsuarioForm />
      </div>
    </div>
  );
};

export default EditarUsuario;
