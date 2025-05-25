import { FC, useEffect, useState } from "react";
import { Comentario } from "../../../types/reportFeed";
import { Comment } from "./Comment";
import { CommentInput } from "./CommentInput";
import { getUsuarioIdPorEmail } from "../userServices/api";
import useAuth from "../../../hooks/useAuth";
import "../../../styles/comment-section.css"

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
  const [comentariosLocales, setComentariosLocales] = useState<Comentario[]>(comentarios);
  const [idUsuario, setIdUsuario] = useState<string | null>(null);

  const { email } = useAuth();

  useEffect(() => {
    setComentariosLocales(comentarios); // 🔥 Esto resuelve el bug
  }, [comentarios]);

  useEffect(() => {
    const fetchUsuarioId = async () => {
      try {
        if (email) {
          const id = await getUsuarioIdPorEmail(email);
          setIdUsuario(id);
        }
      } catch (err) {
        console.error("Error obteniendo ID de usuario:", err);
      }
    };

    fetchUsuarioId();
  }, [email]);

  const reloadComentarios = () => {
    onComment(); // 🔄 Esto llama a refetch en el hook
  };

  return (
    <div className="comment-section">
      <h4 className="comment-section-title">Comentarios</h4>
      <div className="comment-list">
        {comentariosLocales.map((c) => (
          <Comment key={c.id} data={c} />
        ))}
      </div>

      {idUsuario && (
        <CommentInput
          reporteId={reporteId}
          idUsuario={idUsuario}
          onComment={reloadComentarios}
        />
      )}
    </div>
  );
};
