import { apiClient } from '../../../services/apiClient';
import { FormDataLogin,FormDataRegister  } from '../../../types/user';

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

