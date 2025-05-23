import { FC, useState, useRef } from "react";
import { Button } from "../../../components/ui/Button";
import type { ValidarCodigoFormProps } from "../../../types/user";
import "../../../styles/ValidarCodigoForm.css";

interface Props extends ValidarCodigoFormProps {
  onSuccess: () => void;
  onError: () => void;
}

export const ValidarCodigoForm: FC<Props> = ({ email, onSuccess, onError }) => {
  const [codigo, setCodigo] = useState(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const nuevoCodigo = [...codigo];
    nuevoCodigo[index] = value;
    setCodigo(nuevoCodigo);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleValidar = () => {
    const codigoIngresado = codigo.join("");
    if (codigoIngresado === "1234") {
      console.log(JSON.stringify({ mensaje: "Código correcto", codigo: codigoIngresado }));
      onSuccess();
    } else {
      console.log(JSON.stringify({ error: "Código inválido", codigo: codigoIngresado }));
      onError();
    }
  };

  return (
      <div className="validar-codigo-wrapper">
        <div className="validar-codigo-container">
          <h2 className="validar-codigo-title">Código de verificación</h2>
          <p className="validar-codigo-texto">
            Ingrese el número de verificación que le enviamos a su correo <strong>{email}</strong>
          </p>

          <div className="codigo-input-group">
            {codigo.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    className="codigo-digit-input"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
          </div>

          <Button onClick={handleValidar}>Verificar</Button>
        </div>
      </div>
  );
};

