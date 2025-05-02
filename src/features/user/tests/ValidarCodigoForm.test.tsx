import { render, screen, fireEvent } from '@testing-library/react';
import { ValidarCodigoForm } from '../components/ValidarCodigoForm';

describe('ValidarCodigoForm Component', () => {
  const testEmail = 'correo@ejemplo.com';

  test('renderiza título, texto con correo y elementos del formulario', () => {
    render(<ValidarCodigoForm email={testEmail} />);

    expect(screen.getByText(/activar cuenta/i)).toBeInTheDocument();
    expect(screen.getByText((content, element) =>
      content.includes(testEmail) &&
      element?.tagName.toLowerCase() === 'strong'
    )).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/código de 4 dígitos/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /validar código/i })).toBeInTheDocument();
  });

  test('permite ingresar hasta 4 dígitos numéricos y rechaza letras', () => {
    render(<ValidarCodigoForm email={testEmail} />);
    const input = screen.getByPlaceholderText(/código de 4 dígitos/i) as HTMLInputElement;

    // Ingreso válido
    fireEvent.change(input, { target: { value: '1234' } });
    expect(input.value).toBe('1234');

    // Intento con caracteres no numéricos
    fireEvent.change(input, { target: { value: '12a34' } });
    expect(input.value).toBe('1234'); // mantiene valor anterior válido

    // Intento con más de 4 dígitos
    fireEvent.change(input, { target: { value: '123456' } });
    expect(input.value).toBe('1234'); // aún se restringe a 4 dígitos
  });

  test('dispara mensaje de código correcto si el código es 1234', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<ValidarCodigoForm email={testEmail} />);

    fireEvent.change(screen.getByPlaceholderText(/código de 4 dígitos/i), {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: /validar código/i }));

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({ mensaje: 'Código correcto', codigo: '1234' })
    );
    consoleSpy.mockRestore();
  });

  test('dispara mensaje de código inválido si el código es incorrecto', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<ValidarCodigoForm email={testEmail} />);

    fireEvent.change(screen.getByPlaceholderText(/código de 4 dígitos/i), {
      target: { value: '0000' },
    });
    fireEvent.click(screen.getByRole('button', { name: /validar código/i }));

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({ error: 'Código inválido', codigo: '0000' })
    );
    consoleSpy.mockRestore();
  });
});
