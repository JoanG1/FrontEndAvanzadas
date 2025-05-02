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
  


  