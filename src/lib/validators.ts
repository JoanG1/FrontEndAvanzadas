// Valida formato de correo electrónico
export function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

// Valida que el código tenga exactamente 4 dígitos
export function isValidCodigo(codigo: string): boolean {
  return /^\d{4}$/.test(codigo);
}

// Valida que una contraseña tenga al menos 8 caracteres, una mayúscula, una minúscula y un número
export function isStrongPassword(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

// Valida que un campo no esté vacío (sin espacios en blanco)
export function isNotEmpty(text: string): boolean {
  return text.trim().length > 0;
}

// Valida coincidencia entre dos contraseñas
export function doPasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}
