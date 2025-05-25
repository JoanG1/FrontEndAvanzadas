import { apiClient } from '../../../services/apiClient';
import { FormDataLogin,FormDataRegister  } from '../../../types/user';
import axios from 'axios';
import { Reporte } from '../../../types/reportFeed';
import { Comentario } from '../../../types/user';

export const loginUser = async (data: FormDataLogin) => {
  const response = await apiClient.post('/api/auth/login', data);
  return response.data;
};

export const registerUser = async (data: FormDataRegister) => {
  const response = await apiClient.post('/api/auth/register', data);
  return response.data;
};

export const generarCodigoValidacion = async (userId: string) => {
  const response = await apiClient.post('/codigo-validacion/generar', { idUsuario: userId });
  return response.data;
};

export const validarCodigoActivacion = async (email: string, codigoActivacion: string) => {
  const response = await apiClient.post('/api/usuarios/activar', {
    email,
    codigoActivacion
  });
  return response.data;
};

export const getUsuarioPorEmail = async (email: string) => {
  const response = await apiClient.get(`/api/usuarios/${email}`);
  return response.data;
};

export const actualizarUsuario = async (email: string, data: {
  nombre: string;
  telefono: string;
  direccion: string;
  ciudad: string;
}) => {
  const response = await apiClient.put(`/api/usuarios/${email}`, data);
  return response.data;
};

export const getCategorias = async () => {
  const response = await apiClient.get('/api/admin/categorias');
  return response.data;
};

export const crearReporte = async (email: string ,data: {
  titulo: string;
  descripcion: string;
  ubicacion: {
    latitud: number;
    longitud: number;
    direccion: string;
  };
  estadoReporte: string;
  imagenes: string[];
  categoria: string;
  fechaCreacion: string;
}) => {
  const response = await apiClient.post(`/api/reportes/${email}`, data);
  return response.data;
};

export const uploadImage = async (reportId: string, file: File): Promise<string> => {
  const token = localStorage.getItem('jwt_token');
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(
    `http://localhost:8080/api/images/upload?id=${reportId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // NO pongas Content-Type aquí; el navegador lo gestiona automáticamente
      },
    }
  );

  return response.data; // Asegúrate que tu backend devuelve { url: "..." }
};


export const getTodosLosReportes = async (): Promise<Reporte[]> => {
  const response = await apiClient.get('/api/reportes');
  return response.data;
};

export const comentarReporte = async (
  idReporte: string,
  contenido: string,
  idUsuario: string
) => {
  const response = await apiClient.post('/api/comentarios', {
    contenido,
    idUsuario,
    idReporte,
  });
  return response.data;
};

export const getUsuarioIdPorEmail = async (email: string): Promise<string> => {
  const response = await apiClient.get(`/api/usuarios/id/${email}`);
  return response.data.mensaje; // ya que el ID viene en el campo "mensaje"
};

export const getComentariosPorReporte = async (idReporte: string): Promise<Comentario[]> => {
  const response = await apiClient.get(`/api/comentarios/${idReporte}`);
  return response.data;
};

export const getReportesPorUsuario = async (idUsuario: string): Promise<any[]> => {
  const response = await apiClient.get(`/api/reportes/usuario/${idUsuario}`);
  return response.data;
};

export const crearCategoria = async (data: {
  nombre: string;
  descripcion: string;
}) => {
  const body = {
    id: {
      timestamp: "",
      date: "",
    },
    nombre: data.nombre,
    descripcion: data.descripcion,
  };

  const response = await apiClient.post("/api/admin/categorias", body);
  return response.data;
};

export const getReportes = async (): Promise<any[]> => {
  const response = await apiClient.get(`/api/reportes`);
  return response.data;
};


export const cambiarEstadoReporte = async (id: number, nuevoEstado: string) => {
  const idReporte: String= id.toString();
  console.log(idReporte)
  const body = {
    idReporte,
    nuevoEstado,
  };

  const response = await apiClient.post("/api/reportes/cambiar-estado", body);
  return response.data;
};