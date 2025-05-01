import { FC } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => (
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
