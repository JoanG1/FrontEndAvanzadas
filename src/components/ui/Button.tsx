import { FC } from "react";
import "../stylesUi/Button.css"; // ✅ Importar estilos

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => (
  <button
    className="custom-button"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
