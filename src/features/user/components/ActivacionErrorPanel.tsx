import { FC } from "react";
import { Button } from "../../../components/ui/Button";
import "../../../styles/ActivacionErrorPanel.css";

interface ActivacionErrorPanelProps {
    onReenviar: () => void;
    onSalir: () => void;
}

export const ActivacionErrorPanel: FC<ActivacionErrorPanelProps> = ({ onReenviar, onSalir }) => {
    return (
        <div className="activacion-error-wrapper">
            <div className="activacion-error-container">
                <h2 className="activacion-error-title">Activación de cuenta</h2>
                <p className="activacion-error-texto">
                    El código que proporcionaste no coincide. Debes repetir o salir del proceso.
                </p>
                <div className="activacion-error-botones">
                    <Button onClick={onReenviar}>Reenviar código</Button>
                    <Button onClick={onSalir}>Salir del proceso</Button>
                </div>
            </div>
        </div>
    );
};
