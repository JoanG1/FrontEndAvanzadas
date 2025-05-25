  // src/hooks/useAuth.ts
  import { useState, useEffect } from 'react';
  import { jwtDecode } from 'jwt-decode';

  interface UserAuth {
    email: string | null;
    rol: string | null;
    isAuthenticated: boolean;
    // Potentially other user details or token expiration
  }

  interface MyTokenPayload {
    email: string;
    rol: string;
    exp: number;
  }

  const useAuth = () => {
    const [auth, setAuth] = useState<UserAuth>({
      email: null,
      rol: null,
      isAuthenticated: false,
    });

    useEffect(() => {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        try {
          const decodedToken = jwtDecode<MyTokenPayload>(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp > currentTime) {
            setAuth({
              email: decodedToken.email,
              rol: decodedToken.rol,
              isAuthenticated: true,
            });
          } else {
            // Token expired
            localStorage.removeItem('jwt_token');
            setAuth({ email: null, rol: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error('Failed to decode JWT token:', error);
          localStorage.removeItem('jwt_token');
          setAuth({ email: null, rol: null, isAuthenticated: false });
        }
      } else {
        setAuth({ email: null, rol: null, isAuthenticated: false });
      }
    }, []); // Run once on component mount

    // You might also add functions to handle login/logout that update localStorage and this state
    const login = (newToken: string) => {
      localStorage.setItem('jwt_token', newToken);
      const decodedToken = jwtDecode<MyTokenPayload>(newToken);
      setAuth({
        email: decodedToken.email,
        rol: decodedToken.rol,
        isAuthenticated: true,
      });
    };

    const logout = () => {
      localStorage.removeItem('jwt_token');
      setAuth({ email: null, rol: null, isAuthenticated: false });
    };


    return { ...auth, login, logout };
  };

  export default useAuth;