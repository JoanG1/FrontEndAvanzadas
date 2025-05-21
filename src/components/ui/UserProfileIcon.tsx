import { FC } from "react";
import { FaUser } from "react-icons/fa";
import "../../styles/UserProfileIcon.css";

export const UserProfileIcon: FC = () => {
  return (
    <div className="user-profile-icon" title="Ir a perfil">
      <div className="user-icon-circle">
        <FaUser className="user-icon" />
        <div className="notification-badge">1</div>
      </div>
    </div>
  );
};
