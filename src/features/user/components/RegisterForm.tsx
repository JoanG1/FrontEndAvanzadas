// src/features/user/components/RegisterForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form'; //Libreria para manejar formularios
import '../../../styles/RegisterForm.css'; //Hoja de estilos del componente RegisterForm
import { FormDataRegister } from "../../../types/user";

const RegisterForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataRegister>();

	const onSubmit = (data: FormDataRegister) => {
		console.log(JSON.stringify(data, null, 2));
	};

	return (
		<div className="register-container">
			<h1 className="register-title">Registro</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="register-form">
				<input {...register('nombre', { required: 'Nombre requerido' })} placeholder="Nombre Completo" className="register-input" />
				{errors.nombre && <p className="register-error">{errors.nombre.message}</p>}

				<input {...register('correo', {
					required: 'Correo requerido',
					pattern: {
						value: /^\S+@\S+$/i,
						message: 'Correo no válido',
					},
				})} placeholder="Correo" className="register-input" />
				{errors.correo && <p className="register-error">{errors.correo.message}</p>}

				<input {...register('telefono', {
					required: 'Teléfono requerido',
					pattern: {
						value: /^[0-9]{7,15}$/,
						message: 'Número no válido',
					},
				})} placeholder="Teléfono" className="register-input" />
				{errors.telefono && <p className="register-error">{errors.telefono.message}</p>}

				<input {...register('ciudad', { required: 'Ciudad requerida' })} placeholder="Ciudad" className="register-input" />
				{errors.ciudad && <p className="register-error">{errors.ciudad.message}</p>}

				<input {...register('direccion', { required: 'Dirección requerida' })} placeholder="Dirección" className="register-input" />
				{errors.direccion && <p className="register-error">{errors.direccion.message}</p>}

				<input {...register('contrasena', {
					required: 'Contraseña requerida',
					minLength: {
						value: 6,
						message: 'Debe tener al menos 6 caracteres',
					},
				})} type="password" placeholder="Contraseña" className="register-input" />
				{errors.contrasena && <p className="register-error">{errors.contrasena.message}</p>}

				<button type="submit" className="register-button">
					Continuar
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
