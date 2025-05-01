import { FC } from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

export const Input: FC<InputProps> = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    className="border px-4 py-2 rounded w-full"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
  />
);
