//TIPADO DE USUARIO
export interface User {
    id: number;
    email: string;
    token: string;
}


//TIPADO DE FORMULARIO DE REGISTRO
export interface FormDataRegister {
	nombre: string;
	correo: string;
	telefono: string;
	ciudad: string;
	direccion: string;
	contrasena: string;
};


//TIPADO DE FORMULARIO DE INICIO DE SESIÓN
export interface FormDataLogin {
	correo: string;
	contrasena: string;
  }


//TIPADO DE FORMULARIO CODIGO DE VALIDACIÓN
export interface CodigoValidacionFormProps {
	email: string;
  }
  

//TIPADO DE FORMULARIO VALIDACION DEL CODIGO
export interface ValidarCodigoFormProps {
	email: string;
}


//TIPADO DE FORMULARIO DE RECUPERACION DE CUENTA
export interface RecuperarCuentaFormProps {}

  



  