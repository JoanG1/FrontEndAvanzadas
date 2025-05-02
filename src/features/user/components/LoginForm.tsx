import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';//BOTON REUTILIZABLE
import '../../../styles/LoginForm.css';// HOJA DE ESTILOS DEL LOGIN
import { FormDataLogin } from '../../../types/user';//TIPADO DEL FORMATO DEL FORMULARIO

//FORMULARIO DE INGRESO A LOGIN, DATOS (CORREO, CONTRASEÑA)

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>();

  const onSubmit = (data: FormDataLogin) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          {...register('correo', {
            required: 'Correo requerido',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Correo no válido',
            },
          })}
          placeholder="Correo"
          className="login-input"
        />
        {errors.correo && <p className="login-error">{errors.correo.message}</p>}

        <input
          {...register('contrasena', {
            required: 'Contraseña requerida',
            minLength: {
              value: 6,
              message: 'Debe tener al menos 6 caracteres',
            },
          })}
          type="password"
          placeholder="Contraseña"
          className="login-input"
        />
        {errors.contrasena && <p className="login-error">{errors.contrasena.message}</p>}

        <Button>
          Iniciar sesión
        </Button>
      </form>

      <div className="login-footer">
        <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
        <p><a href="/forgot-password">¿Olvidaste tu contraseña?</a></p>
      </div>
    </div>
  );
};

export default LoginForm;
