import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import '../../../styles/LoginForm.css';
import { FormDataLogin } from '../../../types/user';
import { isValidEmail, isStrongPassword } from '../../../lib/validators'; // ✅ Importación

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>();

  const onSubmit = (data: FormDataLogin) => {
    console.log(JSON.stringify(data, null, 2));
    // Lógica de autenticación aquí
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          {...register('correo', {
            required: 'Correo requerido',
            validate: (value) =>
              isValidEmail(value) || 'Correo no válido', // ✅ Usando helper
          })}
          placeholder="Correo"
          className="login-input"
        />
        {errors.correo && <p className="login-error">{errors.correo.message}</p>}

        <input
          {...register('contrasena', {
            required: 'Contraseña requerida',
            validate: (value) =>
              isStrongPassword(value) ||
              'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número', // ✅ Usando helper
          })}
          type="password"
          placeholder="Contraseña"
          className="login-input"
        />
        {errors.contrasena && (
          <p className="login-error">{errors.contrasena.message}</p>
        )}

        <Button>Iniciar sesión</Button>
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
  );
};

export default LoginForm;
