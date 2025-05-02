import { render, screen, fireEvent } from '@testing-library/react';
import { RecuperarCuentaForm } from '../components/RecuperarCuentaForm';

describe('RecuperarCuentaForm Component', () => {
  test('renderiza título, texto, input y botón', () => {
    render(<RecuperarCuentaForm />);

    expect(screen.getByText(/recuperar cuenta/i)).toBeInTheDocument();
    expect(
      screen.getByText(/proporciona el correo/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tu correo registrado/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar solicitud/i })).toBeInTheDocument();
  });

  test('muestra alerta si el campo de correo está vacío', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<RecuperarCuentaForm />);

    fireEvent.click(screen.getByRole('button', { name: /enviar solicitud/i }));

    expect(alertSpy).toHaveBeenCalledWith('Por favor, ingresa un correo válido.');
    alertSpy.mockRestore();
  });

  test('dispara console.log con el correo ingresado', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<RecuperarCuentaForm />);

    fireEvent.change(screen.getByPlaceholderText(/tu correo registrado/i), {
      target: { value: 'correo@prueba.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /enviar solicitud/i }));

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({ mensaje: 'Solicitud enviada', correo: 'correo@prueba.com' })
    );

    consoleSpy.mockRestore();
  });
});
