import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from '../UserProfile'; 

describe('Componente: UserProfile', () => {
  let mockOnSave;
  let user;

  const renderComponent = (overrideProps = {}) => {
    const defaultProps = {
      userId: '123',
      onSave: mockOnSave,
      ...overrideProps,
    };
    return render(<UserProfile {...defaultProps} />);
  };

  beforeEach(() => {
    mockOnSave = jasmine.createSpy('onSave');
    user = userEvent.setup();
    spyOn(window, 'fetch').and.resolveTo({
      ok: true,
      json: () => Promise.resolve({ id: '123', name: 'Juan Pérez', email: 'juan@example.com' }),
    });
  });

  afterEach(() => {
    cleanup();
    if (jasmine.clock().installed) {
      jasmine.clock().uninstall();
    }
  });

  describe('Renderizado inicial y carga de datos', () => {
    it('debería mostrar un indicador de carga al inicio', () => {
      renderComponent();
      const loader = screen.getByRole('progressbar', { name: /cargando/i });
      expect(loader).toBeTruthy();
    });

    it('debería mostrar los datos del usuario tras una llamada exitosa a la API', async () => {
      renderComponent();
      const heading = await screen.findByRole('heading', { name: /juan pérez/i });
      const emailText = await screen.findByText('juan@example.com');
      expect(heading).toBeTruthy();
      expect(emailText).toBeTruthy();
      expect(window.fetch).toHaveBeenCalledWith('/api/users/123');
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Casos límite y manejo de errores', () => {
    it('debería mostrar un mensaje de error cuando la API falla al cargar los datos', async () => {
      window.fetch.and.rejectWith(new Error('Fallo de red'));
      renderComponent();
      const errorMessage = await screen.findByText(/error al cargar los datos del usuario/i);
      expect(errorMessage).toBeTruthy();
    });

    it('debería manejar props nulas o indefinidas de manera segura (renderizado de fallback)', () => {
      renderComponent({ userId: null });
      const emptyState = screen.getByText(/no se ha proporcionado un usuario/i);
      expect(emptyState).toBeTruthy();
      expect(window.fetch).not.toHaveBeenCalled();
    });
  });

  describe('Interacción del usuario', () => {
    it('debería actualizar el valor del input al escribir un nuevo nombre', async () => {
      renderComponent();
      const input = await screen.findByLabelText(/nombre/i);
      await user.clear(input);
      await user.type(input, 'Carlos Gómez');
      expect(input.value).toBe('Carlos Gómez');
    });

    it('debería llamar a fetch con el método POST y al callback onSave al enviar el formulario con éxito', async () => {
      renderComponent();
      const input = await screen.findByLabelText(/nombre/i);
      const submitButton = screen.getByRole('button', { name: /guardar cambios/i });
      window.fetch.and.resolveTo({ ok: true, json: () => Promise.resolve({}) });

      await user.clear(input);
      await user.type(input, 'Carlos Gómez');
      await user.click(submitButton);

      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledWith('/api/users/123', jasmine.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: 'Carlos Gómez' }),
        }));
      });

      expect(mockOnSave).toHaveBeenCalledTimes(1);
      expect(mockOnSave).toHaveBeenCalledWith({ name: 'Carlos Gómez' });
    });

    it('debería prevenir envíos repetidos del formulario mientras la petición está en curso', async () => {
      let resolvePost;
      const postPromise = new Promise((resolve) => { resolvePost = resolve; });
      window.fetch.and.returnValue(postPromise);

      renderComponent();
      const submitButton = await screen.findByRole('button', { name: /guardar cambios/i });
      
      await user.click(submitButton);
      await user.click(submitButton);

      expect(submitButton.disabled).toBe(true);
      expect(window.fetch).toHaveBeenCalledTimes(2); 

      resolvePost({ ok: true, json: () => Promise.resolve({}) });
    });
  });
});
