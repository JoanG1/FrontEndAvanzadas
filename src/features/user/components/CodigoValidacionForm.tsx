import { FC, useState } from "react";
import { Button } from "../../../components/ui/Button";
import type { CodigoValidacionFormProps } from "../../../types/user";
import "../../../styles/CodigoValidacionForm.css";

const ocultarEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  const ocultoLocal = local.length > 2 ? local[0] + "****" + local.slice(-1) : "****";
  const ocultoDomain = domain.length > 3 ? domain[0] + "****" + domain.slice(-1) : "****";
  return `${ocultoLocal}@${ocultoDomain}`;
};

export const CodigoValidacionForm: FC<CodigoValidacionFormProps> = ({
  email,
  onSubmit,
  onEditarCorreo,
}) => {
  const [codigo, setCodigo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setCodigo(value);
    }
  };

  const handleEnviarCodigo = () => {
    if (codigo.length === 4) {
      onSubmit(codigo);
    } else {
      alert("El código debe tener 4 dígitos.");
    }
  };

  return (
    <div className="codigo-validacion-container">
      <h2 className="codigo-validacion-title">Verificación de código</h2>

      <p className="codigo-validacion-texto">
        A continuación se le enviará un código de activación al correo
        proporcionado <strong>{ocultarEmail(email)}</strong>. Si es correcto, da click en <strong>Enviar código</strong>. 
        Para editar el correo, da vuelta atrás.
      </p>

      <div className="codigo-validacion-form">
        <input
          type="text"
          value={codigo}
          onChange={handleChange}
          maxLength={4}
          placeholder="Ingrese código de 4 dígitos"
          className="codigo-validacion-input"
        />

        <div className="codigo-validacion-buttons">
          <Button onClick={handleEnviarCodigo}>Enviar código</Button>
          <Button onClick={onEditarCorreo}>Editar correo</Button>
        </div>
      </div>
    </div>
  );
};
