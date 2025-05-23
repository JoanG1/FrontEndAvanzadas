import { FC, useState, useRef } from "react";
import { FaUser, FaRegCommentDots, FaMapMarkerAlt, FaTimes, FaFileAlt, FaClipboard } from "react-icons/fa";
import "../../styles/UserProfileIcon.css";

export const UserProfileIcon: FC = () => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300); // Delay para permitir moverse al panel
  };

  return (
    <div>
      <div
        className="user-profile-icon"
        title="Ir a perfil"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="user-icon-circle">
          <FaUser className="user-icon" />
          <div className="notification-badge">1</div>
        </div>
      </div>

      <div
        className={`side-panel ${open ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="nav-icon"><FaUser /></div>
        <div className="nav-icon"><FaClipboard /></div>
        <div className="nav-icon"><FaFileAlt /></div>
        <div className="nav-icon badge">
          <FaRegCommentDots />
          <span className="notif-dot">1</span>
        </div>
        <div className="nav-icon"><FaTimes /></div>
        <div className="nav-icon"><FaMapMarkerAlt /></div>
      </div>
    </div>
  );
};
