import { FC } from "react";
import "../../styles/MesaggePanel.css";
import type { MessagePanelProps } from "../../types/user";

export const MessagePanel: FC<MessagePanelProps> = ({ titulo, mensaje }) => {
  return (
    <div className="message-panel-container">
      <h2 className="message-panel-title">{titulo}</h2>
      <p className="message-panel-texto">{mensaje}</p>
    </div>
  );
};
