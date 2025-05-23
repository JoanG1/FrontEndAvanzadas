import "../../../styles/comment.css";
import { FC } from "react";
import { Comentario } from "../../../types/reportFeed";

export const Comment: FC<{ data: Comentario }> = ({ data }) => (
  <div className="comment">
    <div className="comment-header">
      <div className="comment-user">
        <span>{data.usuario}</span>
      </div>
      <span className="comment-date">{data.fecha}</span>
    </div>
    <p className="comment-text">{data.mensaje}</p>
  </div>
);
