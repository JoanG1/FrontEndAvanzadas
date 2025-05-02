import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

describe('LoginForm Component', () => {
  test('renders email and password inputs', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
  });

  test('shows validation errors if fields are empty', async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    expect(await screen.findByText(/correo requerido/i)).toBeInTheDocument();
    expect(await screen.findByText(/contraseña requerida/i)).toBeInTheDocument();
  });

  test('accepts valid input and submits the form', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: 'StrongPass1' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        JSON.stringify(
          {
            correo: 'test@example.com',
            contrasena: 'StrongPass1',
          },
          null,
          2
        )
      );
    });

    consoleSpy.mockRestore();
  });
});
