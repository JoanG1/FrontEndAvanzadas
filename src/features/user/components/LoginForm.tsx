import { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { useAuth } from "../../../hooks/useAuth";
import { isValidEmail } from "../../../lib/validators";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) return alert("Correo inválido");

    const success = await login(email, password);
    if (!success) alert("Credenciales incorrectas");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" />
      <Button disabled={loading}>{loading ? "Ingresando..." : "Ingresar"}</Button>
    </form>
  );
};
