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
import { registerUser } from '../../user/userServices/api';
import { useNavigate } from 'react-router-dom';


const RegisterForm: React.FC = () => {

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataRegister>();

	const onSubmit = async (data: FormDataRegister) => {
		try {
			const response = await registerUser(data);
			if (!response.error) {
				navigate('/codigo-validacion', { state: { email: data.email, userId: response.mensaje } });
			} else {
				alert('Error al registrar: ' + response.mensaje);
			}
		} catch (error: any) {
			console.error('Error al registrar usuario ❌:', error.response?.data?.message || error.message);
			alert('Error al registrarse: ' + (error.response?.data?.message || error.message));
		}
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
						{...register('email', {
							required: 'Correo requerido',
							validate: (value) => isValidEmail(value) || 'Correo no válido',
						})}
						placeholder="Correo"
						className="register-input"
					/>
					{errors.email && <p className="register-error">{errors.email.message}</p>}

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

					<select
						{...register('ciudad', {
							validate: (value) => isNotEmpty(value) || 'Ciudad requerida',
						})}
						className="register-input"
						defaultValue=""
					>
						<option value="" disabled>
							Selecciona una ciudad
						</option>
						<option value="MEDELLIN">Medellín</option>
						<option value="PEREIRA">Pereira</option>
						<option value="BOGOTA">Bogotá</option>
						<option value="ARMENIA">Armenia</option>
						<option value="MANIZALES">Manizales</option>
						<option value="CALI">Cali</option>
					</select>
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
