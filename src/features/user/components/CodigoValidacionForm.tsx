import { FC } from "react";
import { Button } from "../../../components/ui/Button";
import type { CodigoValidacionFormProps } from "../../../types/user";
import "../../../styles/CodigoValidacionForm.css";

const ocultarEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  const ocultoLocal = local.length > 2 ? local[0] + "****" + local.slice(-1) : "****";
  const ocultoDomain = domain.length > 3 ? domain[0] + "****" + domain.slice(-1) : "****";
  return `${ocultoLocal}@${ocultoDomain}`;
};

export const CodigoValidacionForm: FC<CodigoValidacionFormProps> = ({ email }) => {
  const handleEnviarCodigo = () => {
    const codigoSimulado = "1234"; // CODIGO QUEMADO
    console.log(JSON.stringify({ mensaje: "Código enviado", codigo: codigoSimulado }));
    //AQUI IRIA LA LOGICA QUE USA EL SERVICIO "/CODIGO-VALIDACION"
  };

  const handleEditarCorreo = () => {
    console.log("Volver a editar correo");
    // AQUI PODRIA IR LA NAVEGACION AL REGISTRO PARA EDITAR EL CORREO
  };

  return (
    <div className="codigo-validacion-container">
      <h2 className="codigo-validacion-title">Verificación de código</h2>

      <p className="codigo-validacion-texto">
        A continuación se enviará un código de activación al correo
        proporcionado <strong>{ocultarEmail(email)}</strong>. Haz clic en <strong>Enviar código</strong> para continuar. 
        Para editar el correo, vuelve atrás.
      </p>

      <div className="codigo-validacion-buttons">
        <Button onClick={handleEnviarCodigo}>Enviar código</Button>
        <Button onClick={handleEditarCorreo}>Editar correo</Button>
      </div>
    </div>
  );
};
