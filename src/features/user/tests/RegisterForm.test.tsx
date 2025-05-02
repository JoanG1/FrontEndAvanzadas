import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';

describe('RegisterForm Component', () => {
  const fillAndSubmitForm = () => {
    fireEvent.change(screen.getByPlaceholderText(/nombre completo/i), {
      target: { value: 'Juan Pérez' },
    });
    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: 'juan@correo.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/teléfono/i), {
      target: { value: '123456789' },
    });
    fireEvent.change(screen.getByPlaceholderText(/ciudad/i), {
      target: { value: 'Bogotá' },
    });
    fireEvent.change(screen.getByPlaceholderText(/dirección/i), {
      target: { value: 'Calle 123 #45-67' },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: 'Fuerte123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continuar/i }));
  };

  test('renderiza campos del formulario y botón', () => {
    render(<RegisterForm />);
    expect(screen.getByPlaceholderText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ciudad/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/dirección/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
  });

  test('muestra errores si se envía vacío', async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole('button', { name: /continuar/i }));

    await waitFor(() => {
      expect(screen.getByText(/nombre requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/correo requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/teléfono requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/ciudad requerida/i)).toBeInTheDocument();
      expect(screen.getByText(/dirección requerida/i)).toBeInTheDocument();
      expect(screen.getByText(/contraseña requerida/i)).toBeInTheDocument();
    });
  });

  test('muestra errores por formato inválido', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: 'correo_mal' },
    });
    fireEvent.change(screen.getByPlaceholderText(/teléfono/i), {
      target: { value: 'abc' },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continuar/i }));

    await waitFor(() => {
      expect(screen.getByText(/correo no válido/i)).toBeInTheDocument();
      expect(screen.getByText(/número no válido/i)).toBeInTheDocument();
      expect(screen.getByText(/debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  test('envía formulario correctamente con datos válidos', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<RegisterForm />);

    fillAndSubmitForm();

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('"nombre": "Juan Pérez"')
      );
    });

    consoleSpy.mockRestore();
  });
});
