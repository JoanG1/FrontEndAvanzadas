// src/pages/EditarUsuario.tsx
import React from "react";
import { EditarUsuarioForm } from "../features/user/components/EditarUsuarioForm";
import "../styles/EditarUsuario.css"; // Asegúrate que exista en src/styles/
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const EditarUsuario: React.FC = () => {
  return (
    <div className="editar-usuario-page">
        <UserProfileIcon />
      <div className="editar-usuario-wrapper">
        <h1 className="editar-usuario-title">Pantalla edición de información usuario</h1>
        <EditarUsuarioForm />
      </div>
    </div>
  );
};

export default EditarUsuario;
