import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import CodigoValidacion from "./pages/CodigoValidacion"; 
import ValidarCodigo from "./pages/ValidarCodigo";
import RecuperarCuenta from "./pages/RecuperarCuenta";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Routes>
        <Route path="/" element={<Home />} /> {/* RUTA PARA HOME */}
        <Route path="/register" element={<RegisterPage />} /> {/* RUTA PARA REGISTRO */}
        <Route path="/login" element={<LoginPage />} /> {/* RUTA PARA LOGIN */}
        <Route path="/codigo-validacion" element={<CodigoValidacion />} /> {/* RUTA PARA CODIGO DE VALIDACION */}
        <Route path="/validar-codigo" element={<ValidarCodigo />} /> {/* RUTA PARA VALIDACION DE CODIGO */}
        <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} /> {/* RUTA PARA RECUPERACION DE CUENTA */}
      </Routes>
    </div>
  );
}

export default App;
