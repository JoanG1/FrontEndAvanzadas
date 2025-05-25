import "../../../styles/report-card.css";
import { FC } from "react";
import { Reporte } from "../../../types/reportFeed";
import { CommentSection } from "./CommentSection";
import { LocationHighlight } from "./LocationHighlight";
import { useComentariosPorReporte } from "../../../hooks/useComentarioPorReporte";

interface Props {
  data: Reporte;
  onCommentAdded: () => void;
}

export const ReportCard: FC<Props> = ({ data, onCommentAdded }) => {
  const { comentarios, refetch } = useComentariosPorReporte(data.id);

  const handleComment = () => {
    refetch();          // Actualiza comentarios del reporte
    onCommentAdded();   // Notifica al padre si es necesario
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

      <CommentSection
        reporteId={data.id}
        comentarios={comentarios}
        onComment={handleComment}
      />
    </div>
  );
};
