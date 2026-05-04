import "../../../styles/report-card.css";
import { FC, useState } from "react";
import { Reporte } from "../../../types/reportFeed";
import { CommentSection } from "./CommentSection";
import { LocationHighlight } from "./LocationHighlight";
import { useComentariosPorReporte } from "../../../hooks/useComentarioPorReporte";
import { seguirReporte } from "../userServices/api";
import { getUsuarioIdPorEmail } from "../userServices/api";
import useAuth from "../../../hooks/useAuth";

interface Props {
  data: Reporte;
  onCommentAdded: () => void;
}

export const ReportCard: FC<Props> = ({ data, onCommentAdded }) => {
  const { comentarios, refetch } = useComentariosPorReporte(data.id);
  const [siguiendo, setSiguiendo] = useState(false);
  const [loadingSeguir, setLoadingSeguir] = useState(false);
  const [seguidoresCount, setSeguidoresCount] = useState<number>(
    data.seguidores ?? 0
  );
  const { email } = useAuth();

  const handleComment = () => {
    refetch();
    onCommentAdded();
  };

  const handleSeguir = async () => {
    if (!email) return;
    setLoadingSeguir(true);
    try {
      const idUsuario = await getUsuarioIdPorEmail(email);
      const mensaje = await seguirReporte(data.id, idUsuario);
      const ahoraSigue = mensaje.includes("sigues");
      setSiguiendo(ahoraSigue);
      setSeguidoresCount((prev) => ahoraSigue ? prev + 1 : Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error al seguir reporte:", err);
    } finally {
      setLoadingSeguir(false);
    }
  };

  return (
    <div className="report-card">
      <div className="report-header">
        <div className="report-user-info">
          <span>{data.usuario}</span>
        </div>
        <span className="report-user-date">{data.fecha}</span>
      </div>

      {data.imagenUrl && (
        <img src={data.imagenUrl} alt="reporte" className="report-image" />
      )}

      <h3 className="report-title">{data.titulo}</h3>
      <p className="report-description">{data.descripcion}</p>
      <LocationHighlight text={data.ubicacion} />

      {/* Fila de interacción: seguidores + botón seguir */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: "8px", marginBottom: "4px"
      }}>
        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>
          👥 {seguidoresCount} {seguidoresCount === 1 ? "seguidor" : "seguidores"}
        </span>
        <button
          onClick={handleSeguir}
          disabled={loadingSeguir}
          style={{
            background: siguiendo ? "#6d28d9" : "transparent",
            color: siguiendo ? "white" : "#a78bfa",
            border: "1px solid #a78bfa",
            borderRadius: "6px",
            padding: "3px 12px",
            cursor: "pointer",
            fontSize: "0.78rem",
            fontWeight: "bold",
            opacity: loadingSeguir ? 0.6 : 1,
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {loadingSeguir ? "..." : siguiendo ? "✓ Siguiendo" : "+ Seguir"}
        </button>
      </div>

      <CommentSection
        reporteId={data.id}
        comentarios={comentarios}
        onComment={handleComment}
      />
    </div>
  );
};
