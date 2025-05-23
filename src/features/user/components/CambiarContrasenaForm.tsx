import { FC, useState, useEffect } from "react";
import { Button } from "../../../components/ui/Button";
import "../../../styles/CambiarContrasenaForm.css";

interface CambiarContrasenaFormProps {
  onSuccess: () => void;
}

export const CambiarContrasenaForm: FC<CambiarContrasenaFormProps> = ({ onSuccess }) => {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmarNueva, setConfirmarNueva] = useState("");
  const [errorCoincidencia, setErrorCoincidencia] = useState("");

  useEffect(() => {
    if (confirmarNueva.length > 0 && nueva !== confirmarNueva) {
      setErrorCoincidencia("Las nuevas contraseñas no coinciden.");
    } else {
      setErrorCoincidencia("");
    }
  }, [nueva, confirmarNueva]);

  const handleSubmit = () => {
    if (!actual || !nueva || !confirmarNueva) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (nueva !== confirmarNueva) {
      alert("Las nuevas contraseñas no coinciden.");
      return;
    }

    if (nueva.length < 8) {
      alert("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    console.log("Contraseña cambiada correctamente");
    onSuccess();
  };

  return (
      <div className="fondo-degradado">
        <div className="cambiar-contrasena-container">
          <h2 className="cambiar-contrasena-title">Cambio de contraseña</h2>
          <p className="cambiar-contrasena-texto">Cambia tu contraseña actual</p>

          <div className="cambiar-contrasena-form">
            <input
                type="password"
                value={actual}
                onChange={(e) => setActual(e.target.value)}
                placeholder="Contraseña actual"
                className="cambiar-contrasena-input"
            />
            <input
                type="password"
                value={nueva}
                onChange={(e) => setNueva(e.target.value)}
                placeholder="Nueva contraseña"
                className="cambiar-contrasena-input"
            />
            <input
                type="password"
                value={confirmarNueva}
                onChange={(e) => setConfirmarNueva(e.target.value)}
                placeholder="Confirmar nueva contraseña"
                className="cambiar-contrasena-input"
            />

            {errorCoincidencia && (
                <span className="cambiar-contrasena-error">{errorCoincidencia}</span>
            )}
            <Button onClick={handleSubmit}>Cambiar contraseña</Button>
          </div>
        </div>
      </div>
  );
};
