import { FC, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaUserShield, FaClipboardList, FaTimes, FaSignOutAlt, FaNewspaper
} from "react-icons/fa";
import "../../styles/UserProfileIcon.css";
import useAuth from "../../hooks/useAuth";

export const UserProfileIcon: FC = () => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { rol, logout } = useAuth();

  const isAdmin = rol === "ADMINISTRADOR" || rol === "administrador";

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 300);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div
        className="user-profile-icon"
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
        {isAdmin ? (
          <>
            <div className="nav-icon" title="Perfil" onClick={() => navigate("/user-info")}><FaUser /></div>
            <div className="nav-icon" title="Panel Moderador" onClick={() => navigate("/moderador-dashboard")}><FaUserShield /></div>
            <div className="nav-icon" title="Reportes por revisión" onClick={() => navigate("/reportes-revision")}><FaClipboardList /></div>
            <div className="nav-icon" title="Reportes rechazados" onClick={() => navigate("/mis-reportes-rechazados")}><FaTimes /></div>
            <div className="nav-icon" title="Feed comunidad" onClick={() => navigate("/reportes-feed")}><FaNewspaper /></div>
          </>
        ) : (
          <>
            <div className="nav-icon" title="Perfil" onClick={() => navigate("/user-info")}><FaUser /></div>
            <div className="nav-icon" title="Mis reportes" onClick={() => navigate("/mis-reportes")}>
              <FaClipboardList />
            </div>
            <div className="nav-icon" title="Pendientes" onClick={() => navigate("/mis-reportes-pendientes")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/></svg>
            </div>
            <div className="nav-icon badge" title="Notificaciones" onClick={() => navigate("/mis-notificaciones")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
              <span className="notif-dot">1</span>
            </div>
            <div className="nav-icon" title="Rechazados" onClick={() => navigate("/mis-reportes-rechazados")}><FaTimes /></div>
            <div className="nav-icon" title="Feed comunidad" onClick={() => navigate("/reportes-feed")}><FaNewspaper /></div>
            <div className="nav-icon" title="Mapa" onClick={() => navigate("/")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
            </div>
          </>
        )}

        <div className="nav-icon" title="Cerrar sesión" onClick={handleLogout}
          style={{ marginTop: "auto", marginBottom: "1rem", borderColor: "#f87171" }}>
          <FaSignOutAlt />
        </div>
      </div>
    </>
  );
};
