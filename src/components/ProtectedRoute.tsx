import React, { useState } from 'react';
import PasswordModal from './PasswordModal';
import { getAdminPassword } from '../services/authStore';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const expected = (import.meta.env.VITE_ADMIN_PASSWORD ?? 'eladmin').toString();
  const currentSaved = getAdminPassword();
  const initialAuth = currentSaved === expected;

  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);

  if (!isAuthenticated) {
    return <PasswordModal onAuthenticate={setIsAuthenticated} />;
  }

  return <Component />;
};

export default ProtectedRoute;