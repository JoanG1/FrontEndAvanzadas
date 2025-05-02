import React from 'react';
import LoginForm from '../features/user/components/LoginForm';//TRAEMOS COMPONENTE A RENDERIZAR

const Login: React.FC = () => {
  return (
    <div className="page-container">
      <LoginForm />
    </div>
  );
};

export default Login;
