import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock } from 'react-icons/fa';
import { Button } from '../../../components/ui/Button';
import '../../../styles/LoginForm.css';
import { FormDataLogin } from '../../../types/user';
import { isValidEmail, isStrongPassword } from '../../../lib/validators';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>();

  const onSubmit = (data: FormDataLogin) => {
    console.log(JSON.stringify(data, null, 2));
    // Aquí iría la lógica de autenticación
  };

  return (
      <div className="page-container">
        <div className="login-container">
          <h1 className="login-title">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {/* Campo correo con ícono */}
            <div className="input-wrapper">
              <input
                  {...register('correo', {
                    required: 'Correo requerido',
                    validate: (value) => isValidEmail(value) || 'Correo no válido',
                  })}
                  placeholder="Correo"
                  className="login-input"
              />
              <span className="input-icon">
              <FaUser />
            </span>
            </div>
            {errors.correo && (
                <p className="login-error">{errors.correo.message}</p>
            )}

            {/* Campo contraseña con ícono */}
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
              <span className="input-icon">
              <FaLock />
            </span>
            </div>
            {errors.contrasena && (
                <p className="login-error">{errors.contrasena.message}</p>
            )}

            <Button>Ingresar</Button>
          </form>

          <div className="login-footer">
            <p>
              ¿No tienes cuenta? <a href="/register">Regístrate</a>
            </p>
            <p>
              <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
            </p>
          </div>
        </div>
      </div>
  );
};

export default LoginForm;
