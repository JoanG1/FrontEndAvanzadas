import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock } from 'react-icons/fa';
import { Button } from '../../../components/ui/Button';
import '../../../styles/LoginForm.css';
import { FormDataLogin } from '../../../types/user';
import { isValidEmail, isStrongPassword } from '../../../lib/validators';
import { loginUser } from '../../user/userServices/api';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormDataLogin) => {
    try {
      const response = await loginUser(data);
      if (!response.error) {
        const token = response.mensaje;
        login(token);
        console.log('Login OK, token almacenado ✅');
        navigate('/'); // o redirecciona a dashboard según el rol
      } else {
        alert('Credenciales incorrectas ❌');
      }
    } catch (error: any) {
      console.error('Error autenticación:', error.message);
      alert('Ocurrió un error al intentar iniciar sesión.');
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h1 className="login-title">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="input-wrapper">
            <input
              {...register('email', {
                required: 'Correo requerido',
                validate: (value) => isValidEmail(value) || 'Correo no válido',
              })}
              placeholder="Correo"
              className="login-input"
            />
            <span className="input-icon"><FaUser /></span>
          </div>
          {errors.email && <p className="login-error">{errors.email.message}</p>}

          <div className="input-wrapper">
            <input
              {...register('contrasena', {
                required: 'Contraseña requerida',
                validate: (value) =>
                  isStrongPassword(value) ||
                  'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
              })}
              type="password"
              placeholder="Contraseña"
              className="login-input"
            />
            <span className="input-icon"><FaLock /></span>
          </div>
          {errors.contrasena && <p className="login-error">{errors.contrasena.message}</p>}

          <Button>Ingresar</Button>
        </form>

        <div className="login-footer">
          <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
          <p><a href="/recuperar-cuenta">¿Olvidaste tu contraseña?</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
