import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import CodigoValidacion from "./pages/CodigoValidacion"; 
import ValidarCodigo from "./pages/ValidarCodigo";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import CambiarContrasena from "./pages/CambiarContrasena"; // 👈 Nuevo import
import ReportPage from "./pages/ReportPage";


function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="w-full max-w-6xl px-4 flex flex-col items-center text-center">
      <Routes>
        <Route path="/" element={<Home />} /> {/* RUTA PARA HOME */}
        <Route path="/register" element={<RegisterPage />} /> {/* RUTA PARA REGISTRO */}
        <Route path="/login" element={<LoginPage />} /> {/* RUTA PARA LOGIN */}
        <Route path="/codigo-validacion" element={<CodigoValidacion />} /> {/* RUTA PARA CODIGO DE VALIDACION */}
        <Route path="/validar-codigo" element={<ValidarCodigo />} /> {/* RUTA PARA VALIDACION DE CODIGO */}
        <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} /> {/* RUTA PARA RECUPERACION DE CUENTA */}
        <Route path="/cambiar-contrasena" element={<CambiarContrasena />} /> {/* RUTA PARA CAMBIO DE CONTRASEÑA */}
        <Route path="/nuevo-reporte" element={<ReportPage />} /> {/* RUTA PARA CREAR DE REPORTE */}
      </Routes>
      </div>
    </div>
  );
}

export default App;
