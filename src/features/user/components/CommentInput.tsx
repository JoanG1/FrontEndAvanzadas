import "../../../styles/comment-input.css";
import { useState } from "react";
import { comentarReporte } from "../apiReport";

export const CommentInput = ({
  reporteId,
  onComment,
}: {
  reporteId: string;
  onComment: () => void;
}) => {
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async () => {
    if (mensaje.trim()) {
      await comentarReporte(reporteId, mensaje);
      setMensaje("");
      onComment();
    }
  };

  return (
    <div className="comment-input">
      <input
        type="text"
        placeholder="Escribe un comentario..."
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />
      <button onClick={handleSubmit}>Comentar</button>
    </div>
  );
};
