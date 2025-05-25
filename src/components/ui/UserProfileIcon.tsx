import { FC, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaRegCommentDots,
  FaMapMarkerAlt,
  FaTimes,
  FaFileAlt,
  FaClipboard,
  FaUserShield
} from "react-icons/fa";
import "../../styles/UserProfileIcon.css";
import useAuth from "../../hooks/useAuth";

export const UserProfileIcon: FC = () => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { rol } = useAuth(); // Obtén el rol del usuario autenticado

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  return (
    <div>
      <div
        className="user-profile-icon"
        title="Ir a perfil"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="user-icon-circle" onClick={() => navigate("/user-info")}>
          <FaUser className="user-icon" />
          <div className="notification-badge">1</div>
        </div>
      </div>

      <div
        className={`side-panel ${open ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="nav-icon" onClick={() => navigate("/user-info")}><FaUser /></div>
        <div className="nav-icon" onClick={() => navigate("/mis-reportes")}><FaClipboard /></div>
        <div className="nav-icon" onClick={() => navigate("/mis-reportes-pendientes")}><FaFileAlt /></div>
        <div className="nav-icon badge" onClick={() => navigate("/mis-notificaciones")}>
          <FaRegCommentDots />
          <span className="notif-dot">1</span>
        </div>
        <div className="nav-icon" onClick={() => navigate("/mis-reportes-rechazados")}><FaTimes /></div>
        <div className="nav-icon" onClick={() => navigate("/")}>
          <FaMapMarkerAlt />
        </div>

        {/* ✔️ Ícono solo visible para administradores */}
        {(rol === "administrador" || rol === "ADMINISTRADOR") && (
          <div className="nav-icon" title="Panel Administrador" onClick={() => navigate("/moderador-dashboard")}>
            <FaUserShield />
          </div>
        )}
      </div>
    </div>
  );
};
