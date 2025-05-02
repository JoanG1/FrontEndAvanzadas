import { FC, useState } from "react";
import { Button } from "../../../components/ui/Button";
import type { ValidarCodigoFormProps } from "../../../types/user";
import "../../../styles/ValidarCodigoForm.css";

export const ValidarCodigoForm: FC<ValidarCodigoFormProps> = ({ email }) => {
  const [codigo, setCodigo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setCodigo(value);
    }
  };

  const handleValidar = () => {
    if (codigo === "1234") {
      console.log(JSON.stringify({ mensaje: "Código correcto", codigo }));
      //AQUI IRIA LA LOGICA QUE USA EL SERVICIO "/VALIDACION-CODIGO"
    } else {
      console.log(JSON.stringify({ error: "Código inválido", codigo }));
    }
  };

  return (
    <div className="validar-codigo-container">
      <h2 className="validar-codigo-title">Activar cuenta</h2>
      <p className="validar-codigo-texto">
        Ingrese el código que fue enviado a su correo electrónico: <strong>{email}</strong>
      </p>

      <div className="validar-codigo-form">
        <input
          type="text"
          value={codigo}
          onChange={handleChange}
          maxLength={4}
          placeholder="Código de 4 dígitos"
          className="validar-codigo-input"
        />
        <Button onClick={handleValidar}>Validar código</Button>
      </div>
    </div>
  );
};
