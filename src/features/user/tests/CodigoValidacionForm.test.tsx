import { render, screen, fireEvent } from '@testing-library/react';
import { CodigoValidacionForm } from '../components/CodigoValidacionForm';

describe('CodigoValidacionForm Component', () => {
  const testEmail = 'usuario@dominio.com';

  test('muestra mensaje con correo oculto', () => {
    render(<CodigoValidacionForm email={testEmail} />);

    expect(screen.getByText(/verificación de código/i)).toBeInTheDocument();

    const maskedEmail = 'u****o@d****m'; // Basado en cómo se oculta en el componente
    const strongElements = screen.getAllByRole('strong', { hidden: true }); // fallback si getByText falla

    const matched = strongElements.some((el) =>
      el.textContent === maskedEmail
    );

    expect(matched).toBe(true);
  });

  test('dispara console.log al hacer clic en "Enviar código"', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<CodigoValidacionForm email={testEmail} />);

    fireEvent.click(screen.getByRole('button', { name: /enviar código/i }));

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({ mensaje: 'Código enviado', codigo: '1234' })
    );

    consoleSpy.mockRestore();
  });

  test('dispara console.log al hacer clic en "Editar correo"', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<CodigoValidacionForm email={testEmail} />);

    fireEvent.click(screen.getByRole('button', { name: /editar correo/i }));

    expect(consoleSpy).toHaveBeenCalledWith('Volver a editar correo');

    consoleSpy.mockRestore();
  });
});
