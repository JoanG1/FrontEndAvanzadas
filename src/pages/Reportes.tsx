import "../styles/reportes.css";
import { ReportFeed } from "../features/user/components/ReportFeed";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const Reportes = () => (
  <div className="reportes-container">
    <h1 className="reportes-title">Reportes de la comunidad</h1>
    <UserProfileIcon />
    <ReportFeed />
  </div>
);

export default Reportes;
