import { Routes, Route, Navigate } from "react-router-dom";
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
import ModeratorDashboardPage from "./pages/ModeratorDashboardPage";
import ReportesRevision from "./pages/ReportesRevision";
import ReportePreviewPage from "./pages/ReportPreviewPage";
import ReportePreviewRevision from "./pages/ReportPreviewRevision";
import UserInfoPage from "./pages/UserInfoPage";
import EditarUsuario from "./pages/EditarUsuario";
import GenerarReportePage from "./pages/GenerarReportePage";
import CrearCategoriaPage from "./pages/CrearCategoriaPage";
import PrivateRoute from "./features/user/components/PrivateRoute";
function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/codigo-validacion" element={<CodigoValidacion />} />
      <Route path="/validar-codigo" element={<ValidarCodigo />} />
      <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />

      {/* Redirigir raíz al login si no autenticado */}
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />

      {/* Rutas privadas */}
      <Route path="/cambiar-contrasena" element={<PrivateRoute><CambiarContrasena /></PrivateRoute>} />
      <Route path="/nuevo-reporte" element={<PrivateRoute><ReportPage /></PrivateRoute>} />
      <Route path="/mis-reportes" element={<PrivateRoute><MisReportes /></PrivateRoute>} />
      <Route path="/reportes-feed" element={<PrivateRoute><ReporteFeed /></PrivateRoute>} />
      <Route path="/mis-notificaciones" element={<PrivateRoute><MisNotificaciones /></PrivateRoute>} />
      <Route path="/mis-reportes-pendientes" element={<PrivateRoute><MisReportesPendientes /></PrivateRoute>} />
      <Route path="/mis-reportes-rechazados" element={<PrivateRoute><MisReportesRechazados /></PrivateRoute>} />
      <Route path="/editar-reporte" element={<PrivateRoute><EditReportPage /></PrivateRoute>} />
      <Route path="/reenviar-reporte" element={<PrivateRoute><ResendReportPage /></PrivateRoute>} />
      <Route path="/moderador-dashboard" element={<PrivateRoute><ModeratorDashboardPage /></PrivateRoute>} />
      <Route path="/reportes-revision" element={<PrivateRoute><ReportesRevision /></PrivateRoute>} />
      <Route path="/preview-crear-reporte" element={<PrivateRoute><ReportePreviewPage /></PrivateRoute>} />
      <Route path="/preview-revisar-reporte" element={<PrivateRoute><ReportePreviewRevision /></PrivateRoute>} />
      <Route path="/user-info" element={<PrivateRoute><UserInfoPage /></PrivateRoute>} />
      <Route path="/editar-usuario" element={<PrivateRoute><EditarUsuario /></PrivateRoute>} />
      <Route path="/generar-reporte" element={<PrivateRoute><GenerarReportePage /></PrivateRoute>} />
      <Route path="/Crear-categoria" element={<PrivateRoute><CrearCategoriaPage /></PrivateRoute>} />

      {/* Cualquier ruta desconocida redirige al login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
