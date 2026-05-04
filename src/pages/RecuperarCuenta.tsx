import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generarCodigoValidacion, recuperarContrasena } from "../features/user/userServices/api";
import { getUsuarioIdPorEmail } from "../features/user/userServices/api";

const RecuperarCuenta: React.FC = () => {
  const navigate = useNavigate();
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState(["", "", "", ""]);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [error, setError] = useState("");

  // Paso 1 — enviar código al email
  const handleEnviarCodigo = async () => {
    if (!email.trim()) { setError("Ingresa tu correo."); return; }
    setError("");
    try {
      const id = await getUsuarioIdPorEmail(email);
      await generarCodigoValidacion(id);
      setPaso(2);
    } catch (e) {
      setError("No se encontró una cuenta con ese correo.");
    }
  };

  // Paso 2 — validar código
  const handleValidarCodigo = () => {
    if (codigo.join("").length < 4) { setError("Ingresa el código completo."); return; }
    setError("");
    setPaso(3);
  };

  // Paso 3 — nueva contraseña
  const handleCambiarContrasena = async () => {
    if (!nuevaContrasena || !confirmar) { setError("Completa todos los campos."); return; }
    if (nuevaContrasena !== confirmar) { setError("Las contraseñas no coinciden."); return; }
    if (nuevaContrasena.length < 8) { setError("Mínimo 8 caracteres."); return; }
    setError("");
    try {
      await recuperarContrasena(email, codigo.join(""), nuevaContrasena);
      alert("Contraseña actualizada correctamente.");
      navigate("/login");
    } catch (e: any) {
      setError(e.response?.data?.mensaje || "Error al actualizar la contraseña.");
    }
  };

  const handleCodigoChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const nuevo = [...codigo];
    nuevo[index] = value;
    setCodigo(nuevo);
    if (value && index < 3) {
      document.getElementById(`cod-${index + 1}`)?.focus();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "url('/fondo.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "1rem",
      boxSizing: "border-box" as const
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "1rem",
        padding: "2.5rem",
        maxWidth: "420px",
        width: "100%",
        boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: "1rem"
      }}>

        {/* PASO 1 — Email */}
        {paso === 1 && (
          <>
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "1.8rem", textAlign: "center" }}>
              Recuperar contraseña
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", textAlign: "center", fontSize: "0.9rem" }}>
              Ingresa tu correo y te enviaremos un código de verificación.
            </p>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
            {error && <p style={errorStyle}>{error}</p>}
            <button onClick={handleEnviarCodigo} style={btnStyle}>Enviar código</button>
            <button onClick={() => navigate("/login")} style={btnSecStyle}>Volver al login</button>
          </>
        )}

        {/* PASO 2 — Código */}
        {paso === 2 && (
          <>
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "1.8rem", textAlign: "center" }}>
              Verificar código
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", textAlign: "center", fontSize: "0.9rem" }}>
              Ingresa el código enviado a <strong style={{ color: "#fff" }}>{email}</strong>
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              {codigo.map((digit, index) => (
                <input
                  key={index}
                  id={`cod-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleCodigoChange(index, e.target.value)}
                  style={{
                    width: "60px", height: "70px", textAlign: "center" as const,
                    fontSize: "2rem", borderRadius: "1rem", border: "none",
                    background: "rgba(255,255,255,0.85)", color: "#2C0844"
                  }}
                />
              ))}
            </div>
            {error && <p style={errorStyle}>{error}</p>}
            <button onClick={handleValidarCodigo} style={btnStyle}>Continuar</button>
          </>
        )}

        {/* PASO 3 — Nueva contraseña */}
        {paso === 3 && (
          <>
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "1.8rem", textAlign: "center" }}>
              Nueva contraseña
            </h2>
            <div style={{ position: "relative" as const, width: "100%" }}>
              <input
                type={mostrarNueva ? "text" : "password"}
                placeholder="Nueva contraseña"
                value={nuevaContrasena}
                onChange={e => setNuevaContrasena(e.target.value)}
                style={{ ...inputStyle, paddingRight: "2.5rem" }}
              />
              <span onClick={() => setMostrarNueva(!mostrarNueva)} style={eyeStyle}>
                {mostrarNueva ? "🙈" : "👁️"}
              </span>
            </div>
            <div style={{ position: "relative" as const, width: "100%" }}>
              <input
                type={mostrarConfirmar ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={confirmar}
                onChange={e => setConfirmar(e.target.value)}
                style={{ ...inputStyle, paddingRight: "2.5rem" }}
              />
              <span onClick={() => setMostrarConfirmar(!mostrarConfirmar)} style={eyeStyle}>
                {mostrarConfirmar ? "🙈" : "👁️"}
              </span>
            </div>
            {error && <p style={errorStyle}>{error}</p>}
            <button onClick={handleCambiarContrasena} style={btnStyle}>Cambiar contraseña</button>
          </>
        )}
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 1rem",
  borderRadius: "9999px",
  border: "none",
  background: "rgba(255,255,255,0.85)",
  color: "#2C0844",
  fontSize: "0.95rem",
  boxSizing: "border-box"
};

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem",
  borderRadius: "9999px",
  border: "none",
  background: "#2C0844",
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer"
};

const btnSecStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem",
  borderRadius: "9999px",
  border: "none",
  background: "transparent",
  color: "rgba(255,255,255,0.7)",
  fontSize: "0.9rem",
  cursor: "pointer",
  textDecoration: "underline"
};

const errorStyle: React.CSSProperties = {
  color: "#ffb3b3",
  fontSize: "0.8rem",
  textAlign: "center",
  margin: 0
};

const eyeStyle: React.CSSProperties = {
  position: "absolute",
  right: "1rem",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "1.1rem"
};

export default RecuperarCuenta;
