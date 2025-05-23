import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import CodigoValidacion from "./pages/CodigoValidacion"; 
import ValidarCodigo from "./pages/ValidarCodigo";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import CambiarContrasena from "./pages/CambiarContrasena";
import ReportPage from "./pages/ReportPage";
import MisReportes from "./pages/MisReportes"; 
import ReporteFeed from "./pages/Reportes";
import MisNotificaciones from "./pages/MisNotificaciones";
import MisReportesPendientes from "./pages/MisReportesPendientes";
import MisReportesRechazados from "./pages/MisReportesRechazados";
import EditReportPage from "./pages/EditReportPage";
import ResendReportPage from "./pages/ResendReportPage";

function App() {
  return (
  
      <div className="h-screen w-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/codigo-validacion" element={<CodigoValidacion />} />
          <Route path="/validar-codigo" element={<ValidarCodigo />} />
          <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />
          <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
          <Route path="/nuevo-reporte" element={<ReportPage />} />
          <Route path="/mis-reportes" element={<MisReportes />} /> 
          <Route path="/reportes-feed" element={<ReporteFeed />} /> 
          <Route path="/mis-notificaciones" element={<MisNotificaciones />} /> 
          <Route path="/mis-reportes-pendientes" element={<MisReportesPendientes />} />
          <Route path="/mis-reportes-rechazados" element={<MisReportesRechazados />} />
          <Route path="/editar-reporte" element={<EditReportPage />} />
          <Route path="/reenviar-reporte" element={<ResendReportPage />} />
        </Routes>
      </div>

  );
}

export default App;
