import "../../../styles/report-card.css";
import { FC } from "react";
import { Reporte } from "../../../types/reportFeed";
import { CommentSection } from "./CommentSection";
import { LocationHighlight } from "./LocationHighlight";

interface Props {
  data: Reporte;
  onCommentAdded: () => void;
}

export const ReportCard: FC<Props> = ({ data, onCommentAdded }) => {
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

      <div className="report-footer">
        <button className="comentar-btn">COMENTAR</button>
      </div>

      <CommentSection
        comentarios={data.comentarios}
        reporteId={data.id}
        onComment={onCommentAdded}
      />
    </div>
  );
};
