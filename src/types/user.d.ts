//TIPADO DE USUARIO
export interface User {
    id: number;
    email: string;
    token: string;
}


//TIPADO DE FORMULARIO DE REGISTRO
export interface FormDataRegister {
	nombre: string;
	email: string;
	telefono: string;
	ciudad: string;
	direccion: string;
	contrasena: string;
};


//TIPADO DE FORMULARIO DE INICIO DE SESIÓN
export interface FormDataLogin {
	email: string;
	contrasena: string;
  }


//TIPADO DE FORMULARIO CODIGO DE VALIDACIÓN
export interface CodigoValidacionFormProps {
  email: string;
  userId: string;
}

  

export interface ValidarCodigoFormProps {
  email: string;
  userId: string;
  codigoGenerado: string;
}



//TIPADO DE FORMULARIO DE RECUPERACION DE CUENTA
export interface RecuperarCuentaFormProps {}

  
// TIPADO DE FORMULARIO DE CAMBIO DE CONTRASEÑA
export interface CambiarContrasenaFormProps {
  actual: string;
  nueva: string;
  confirmarNueva: string;
}

interface MessagePanelProps {
  titulo: string;
  mensaje: string;
}

export interface Comentario {
  id: string;
  usuario: string; // actualmente no existe en la respuesta
  fecha: string;
  mensaje: string; // actualmente llamado "contenido"
}



  