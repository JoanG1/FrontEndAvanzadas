	import React from 'react';
	import { useForm } from 'react-hook-form';
	import { Button } from '../../../components/ui/Button';
	import '../../../styles/RegisterForm.css';
	import { FormDataRegister } from '../../../types/user';
	import {
	isValidEmail,
	isStrongPassword,
	isNotEmpty,
	} from '../../../lib/validators';
	const RegisterForm: React.FC = () => {
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm<FormDataRegister>();

		const onSubmit = (data: FormDataRegister) => {
			console.log(JSON.stringify(data, null, 2));
			// Aquí va la lógica del servicio "/register"
		};

		return (
			<div className="register-page">
				<div className="register-container">
					<h1 className="register-title">Regístrate</h1>
					<form onSubmit={handleSubmit(onSubmit)} className="register-form">
						<input
							{...register('nombre', {
								validate: (value) => isNotEmpty(value) || 'Nombre requerido',
							})}
							placeholder="Nombre Completo"
							className="register-input"
						/>
						{errors.nombre && <p className="register-error">{errors.nombre.message}</p>}

						<input
							{...register('correo', {
								required: 'Correo requerido',
								validate: (value) => isValidEmail(value) || 'Correo no válido',
							})}
							placeholder="Correo"
							className="register-input"
						/>
						{errors.correo && <p className="register-error">{errors.correo.message}</p>}

						<input
							{...register('telefono', {
								required: 'Teléfono requerido',
								pattern: {
									value: /^[0-9]{7,15}$/i,
									message: 'Número no válido',
								},
							})}
							placeholder="Teléfono"
							className="register-input"
						/>
						{errors.telefono && <p className="register-error">{errors.telefono.message}</p>}

						<input
							{...register('ciudad', {
								validate: (value) => isNotEmpty(value) || 'Ciudad requerida',
							})}
							placeholder="Ciudad"
							className="register-input"
						/>
						{errors.ciudad && <p className="register-error">{errors.ciudad.message}</p>}

						<input
							{...register('direccion', {
								validate: (value) => isNotEmpty(value) || 'Dirección requerida',
							})}
							placeholder="Dirección"
							className="register-input"
						/>
						{errors.direccion && <p className="register-error">{errors.direccion.message}</p>}

						<input
							{...register('contrasena', {
								required: 'Contraseña requerida',
								validate: (value) =>
									isStrongPassword(value) ||
									'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
							})}
							type="password"
							placeholder="Contraseña"
							className="register-input"
						/>
						{errors.contrasena && <p className="register-error">{errors.contrasena.message}</p>}

						<Button>Continuar</Button>
					</form>
				</div>
			</div>
		);
	};

	export default RegisterForm;
