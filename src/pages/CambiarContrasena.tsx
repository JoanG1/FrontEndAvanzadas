import React, { useState } from "react";
import { CambiarContrasenaForm } from "../features/user/components/CambiarContrasenaForm";
import { MessagePanel } from "../components/ui/MesaggePanel";

const CambiarContrasena: React.FC = () => {
  const [cambioExitoso, setCambioExitoso] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cambio de contraseña</h1>

      {cambioExitoso ? (
        <MessagePanel
          titulo="Cambio de contraseña"
          mensaje="Tu contraseña ha sido cambiada exitosamente."
        />
      ) : (
        <CambiarContrasenaForm onSuccess={() => setCambioExitoso(true)} />
      )}
    </div>
  );
};

export default CambiarContrasena;
