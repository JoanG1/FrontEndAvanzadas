import { FC, useState } from "react";
import { Report } from "../../../types/report";
import "../../../styles/Reports.css";
import { getHistorialReporte, seguirReporte } from "../userServices/api";
import useAuth from "../../../hooks/useAuth";
import { getUsuarioIdPorEmail } from "../userServices/api";

interface Props {
  reporte: Report;
  onVerificar?: (id: string, nivelImpacto: string) => void;
  onRechazar?: (id: string, nivelImpacto: string) => void;
  showAdminActions?: boolean;
}

export const ReportCard: FC<Props> = ({
  reporte,
  onVerificar,
  onRechazar,
  showAdminActions = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [nivelImpacto, setNivelImpacto] = useState("");
  const [showHistorial, setShowHistorial] = useState(false);
  const [historial, setHistorial] = useState<any[]>([]);
  const [siguiendo, setSiguiendo] = useState(false);
  const [loadingSeguir, setLoadingSeguir] = useState(false);

  const { email } = useAuth();

  const handleVerificar = async () => {
    if (!onVerificar) return;
    setLoading(true);
    await onVerificar(reporte.id, nivelImpacto);
    setLoading(false);
  };

  const handleRechazar = async () => {
    if (!onRechazar) return;
    setLoading(true);
    await onRechazar(reporte.id, nivelImpacto);
    setLoading(false);
  };

  const handleVerHistorial = async () => {
    try {
      const data = await getHistorialReporte(reporte.id);
      setHistorial(data);
      setShowHistorial(true);
    } catch (err) {
      console.error("Error al cargar historial:", err);
    }
  };

  const handleSeguir = async () => {
    if (!email) return;
    setLoadingSeguir(true);
    try {
      const idUsuario = await getUsuarioIdPorEmail(email);
      const mensaje = await seguirReporte(reporte.id, idUsuario);
      // Alternar estado local según respuesta del servidor
      setSiguiendo(mensaje.includes("sigues"));
    } catch (err) {
      console.error("Error al seguir reporte:", err);
    } finally {
      setLoadingSeguir(false);
    }
  };

  const colorEstado: Record<string, string> = {
    PENDIENTE: "#facc15",
    VERIFICADO: "#4ade80",
    RECHAZADO: "#f87171",
  };

  const estado = reporte.estado?.toUpperCase() ?? "PENDIENTE";

  return (
    <div
      className="report-card"
      style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem" }}
    >
      {reporte.imagenUrl && (
        <img
          src={reporte.imagenUrl}
          alt="Reporte"
          className="report-img"
          style={{
            width: "80px", height: "80px", objectFit: "cover",
            borderRadius: "8px", flexShrink: 0,
          }}
        />
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 className="report-title" style={{ marginBottom: "4px" }}>{reporte.titulo}</h3>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "2px" }}>
          {reporte.categoria}
        </p>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{reporte.ubicacion}</p>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{reporte.fecha}</p>
        {/* Contador de seguidores */}
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
          👥 {reporte.seguidores ?? 0} {reporte.seguidores === 1 ? "seguidor" : "seguidores"}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            padding: "2px 10px", borderRadius: "999px", fontSize: "0.75rem",
            fontWeight: "bold", background: colorEstado[estado] ?? "#aaa", color: "#1a1a1a",
          }}
        >
          {estado}
        </span>

        {/* Botón Seguir — visible para usuarios (no admin) */}
        {!showAdminActions && (
          <button
            onClick={handleSeguir}
            disabled={loadingSeguir}
            style={{
              background: siguiendo ? "#6d28d9" : "transparent",
              color: siguiendo ? "white" : "#a78bfa",
              border: "1px solid #a78bfa",
              borderRadius: "6px", padding: "4px 10px", cursor: "pointer",
              fontSize: "0.75rem", fontWeight: "bold",
              opacity: loadingSeguir ? 0.6 : 1,
            }}
          >
            {loadingSeguir ? "..." : siguiendo ? "✓ Siguiendo" : "+ Seguir"}
          </button>
        )}

        <button
          onClick={handleVerHistorial}
          style={{
            background: "transparent", color: "#a78bfa", border: "1px solid #a78bfa",
            borderRadius: "6px", padding: "4px 10px", cursor: "pointer",
            fontSize: "0.75rem",
          }}
        >
          Ver historial
        </button>

        {showAdminActions && (
          <>
            <select
              onChange={(e) => setNivelImpacto(e.target.value)}
              value={nivelImpacto}
              style={{
                background: "#2a2a2a", color: "white", border: "1px solid #555",
                borderRadius: "6px", padding: "4px 8px", fontSize: "0.8rem",
              }}
            >
              <option value="">Nivel de impacto</option>
              <option value="BAJO">BAJO</option>
              <option value="MEDIO">MEDIO</option>
              <option value="ALTO">ALTO</option>
            </select>

            <button
              disabled={loading || estado === "VERIFICADO"}
              onClick={handleVerificar}
              style={{
                background: "#4ade80", color: "#1a1a1a", border: "none",
                borderRadius: "6px", padding: "4px 12px", cursor: "pointer",
                fontWeight: "bold", fontSize: "0.8rem",
                opacity: estado === "VERIFICADO" ? 0.4 : 1,
              }}
            >
              ✓ Verificar
            </button>

            <button
              disabled={loading || estado === "RECHAZADO"}
              onClick={handleRechazar}
              style={{
                background: "#f87171", color: "#1a1a1a", border: "none",
                borderRadius: "6px", padding: "4px 12px", cursor: "pointer",
                fontWeight: "bold", fontSize: "0.8rem",
                opacity: estado === "RECHAZADO" ? 0.4 : 1,
              }}
            >
              ✕ Rechazar
            </button>
          </>
        )}
      </div>

      {showHistorial && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000,
        }}>
          <div style={{
            background: "#1a1a2e", borderRadius: "12px", padding: "2rem",
            maxWidth: "500px", width: "90%", maxHeight: "80vh", overflowY: "auto",
          }}>
            <h3 style={{ color: "white", marginBottom: "1rem" }}>
              Historial de {reporte.titulo}
            </h3>
            {historial.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,0.5)" }}>Sin cambios registrados.</p>
            ) : (
              historial.map((h, i) => (
                <div key={i} style={{
                  borderLeft: "3px solid #a78bfa", paddingLeft: "1rem",
                  marginBottom: "1rem",
                }}>
                  <p style={{ color: "white", fontWeight: "bold", margin: 0 }}>
                    {h.estadoAnterior} → {h.estadoNuevo}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", margin: "4px 0" }}>
                    {new Date(h.fechaCambio).toLocaleString()}
                  </p>
                  {h.observacion && (
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", margin: 0 }}>
                      {h.observacion}
                    </p>
                  )}
                </div>
              ))
            )}
            <button
              onClick={() => setShowHistorial(false)}
              style={{
                marginTop: "1rem", background: "#a78bfa", color: "white",
                border: "none", borderRadius: "6px", padding: "8px 20px",
                cursor: "pointer", fontWeight: "bold",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
