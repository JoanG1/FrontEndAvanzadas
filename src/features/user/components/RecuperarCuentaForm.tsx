import { FC, useState } from "react";
import { Button } from "../../../components/ui/Button";
import type { RecuperarCuentaFormProps } from "../../../types/user";
import "../../../styles/RecuperarCuentaForm.css";
import { useNavigate } from "react-router-dom";

export const RecuperarCuentaForm: FC<RecuperarCuentaFormProps> = () => {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        if (!isValidEmail(email)) {
            return;
        }

        try {
            console.log(JSON.stringify({ mensaje: "Solicitud enviada", correo: email }));
            navigate("/cambiar-contrasena")
            setMensaje("Se ha enviado un correo con instrucciones para recuperar tu cuenta.");
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error al enviar la solicitud. Inténtalo nuevamente.");
        }

    };

    return (
        <div className="recuperar-cuenta-page">
            <div className="recuperar-cuenta-container">
                <h2 className="recuperar-cuenta-title">Recuperar cuenta</h2>
                <p className="recuperar-cuenta-texto">
                    Proporciona el correo y se te enviarán los pasos para recuperar tu cuenta.
                </p>

                <form
                    className="recuperar-cuenta-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <input
                        type="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Tu correo registrado"
                        className="recuperar-cuenta-input"
                        required
                    />
                    <Button onClick={handleSubmit}>Enviar solicitud</Button>
                </form>

                {mensaje && (
                    <div className="text-green-600 mt-4 font-medium text-center">{mensaje}</div>
                )}
            </div>
        </div>
    );
};
