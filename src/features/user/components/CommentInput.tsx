import "../../../styles/comment-input.css";
import { useState } from "react";
import { comentarReporte } from "../userServices/api";

export const CommentInput = ({
  reporteId,
  idUsuario,
  onComment,
}: {
  reporteId: string;
  idUsuario: string;
  onComment: () => void;
}) => {

  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async () => {
    if (mensaje.trim()) {
      await comentarReporte(reporteId,mensaje,idUsuario);
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
