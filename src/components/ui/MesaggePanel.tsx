import { FC } from "react";

interface Props {
  titulo: string;
  mensaje: string;
}

export const MessagePanel: FC<Props> = ({ titulo, mensaje }) => {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "url('/fondo.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: "rgb(30, 0, 60)",
        border: "2px solid purple",
        padding: "2.5rem",
        borderRadius: "1.5rem",
        maxWidth: "450px",
        width: "90%",
        textAlign: "center" as const,
        boxShadow: "0 8px 48px rgba(0,0,0,0.8)"
      }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem", color: "#ffffff" }}>
          {titulo}
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)" }}>
          {mensaje}
        </p>
      </div>
    </div>
  );
};