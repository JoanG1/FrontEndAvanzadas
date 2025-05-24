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
