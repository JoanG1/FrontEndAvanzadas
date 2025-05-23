import React from "react";
import { UserInfoCard } from "../features/user/components/UserInfoCard";
import "../styles/UserInfoPage.css";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const UserInfoPage: React.FC = () => {
  return (
    <div className="user-info-page">
        <UserProfileIcon />
      <UserInfoCard />
    </div>
  );
};

export default UserInfoPage;
