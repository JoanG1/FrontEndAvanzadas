import "../../../styles/comment-section.css";
import { FC, useState } from "react";
import { Comentario } from "../../../types/reportFeed";
import { Comment } from "./Comment";
import { CommentInput } from "./CommentInput";

interface Props {
  comentarios: Comentario[];
  reporteId: string;
  onComment: () => void;
}

export const CommentSection: FC<Props> = ({
  comentarios,
  reporteId,
  onComment,
}) => {
  const [comentariosLocales, setComentariosLocales] = useState(comentarios);

  const reloadComentarios = () => {
    setComentariosLocales([...comentariosLocales]);
    onComment();
  };

  return (
    <div className="comment-section">
      <h4 className="comment-section-title">Comentarios</h4>
      <div className="comment-list">
        {comentariosLocales.map((c) => (
          <Comment key={c.id} data={c} />
        ))}
      </div>
      <CommentInput reporteId={reporteId} onComment={reloadComentarios} />
    </div>
  );
};
