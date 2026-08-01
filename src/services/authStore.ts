/**
 * In-memory & SessionStorage auth store for the admin password.
 * Used by apiClient to attach the X-Admin-Password header to requests.
 */
let memoryAdminPassword: string | null = null;

export const setAdminPassword = (password: string) => {
  memoryAdminPassword = password;
  try {
    sessionStorage.setItem('admin_password_auth', password);
  } catch {
    // ignore
  }
};

export const getAdminPassword = (): string | null => {
  if (memoryAdminPassword) return memoryAdminPassword;
  try {
    const stored = sessionStorage.getItem('admin_password_auth');
    if (stored) {
      memoryAdminPassword = stored;
      return stored;
    }
  } catch {
    // ignore
  }
  return null;
};

export const clearAdminPassword = () => {
  memoryAdminPassword = null;
  try {
    sessionStorage.removeItem('admin_password_auth');
  } catch {
    // ignore
  }
};