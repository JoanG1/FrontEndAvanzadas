import { FC, useState } from "react";
import { Button } from "../../../components/ui/Button";
import type { RecuperarCuentaFormProps } from "../../../types/user";
import "../../../styles/RecuperarCuentaForm.css";

export const RecuperarCuentaForm: FC<RecuperarCuentaFormProps> = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (email.trim() === "") {
      alert("Por favor, ingresa un correo válido.");
      return;
    }

    console.log(JSON.stringify({ mensaje: "Solicitud enviada", correo: email }));
    //AQUI IRIA LA LOGICA QUE USA EL SERVICIO "/RECUPERAR-CUENTA"


  };

  return (
    <div className="recuperar-cuenta-container">
      <h2 className="recuperar-cuenta-title">Recuperar cuenta</h2>
      <p className="recuperar-cuenta-texto">
        Proporciona el correo y se te enviarán los pasos para recuperar tu cuenta.
      </p>

      <div className="recuperar-cuenta-form">
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Tu correo registrado"
          className="recuperar-cuenta-input"
        />
        <Button onClick={handleSubmit}>Enviar solicitud</Button>
      </div>
    </div>
  );
};
