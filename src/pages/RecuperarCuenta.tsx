import React from "react";
import { RecuperarCuentaForm } from "../features/user/components/RecuperarCuentaForm";

const RecuperarCuenta: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">¿Olvidaste tu contraseña?</h1>
      <RecuperarCuentaForm />
    </div>
  );
};

export default RecuperarCuenta;
