import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login"; // ✅ NUEVO

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Routes>
        <Route path="/" element={<Home />} /> {/*RUTA PARA HOME*/}
        <Route path="/register" element={<RegisterPage />} /> {/*RUTA PARA REGISTRO*/}
        <Route path="/login" element={<LoginPage />} /> {/*RUTA PARA LOGIN*/}
      </Routes>
    </div>
  );
}

export default App;
