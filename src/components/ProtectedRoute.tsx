import React, { useState } from 'react';
import PasswordModal from './PasswordModal';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <PasswordModal onAuthenticate={setIsAuthenticated} />;
  }

  return <Component />;
};

export default ProtectedRoute;