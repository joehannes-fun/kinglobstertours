import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { setAdminPassword } from '../services/authStore';

interface PasswordModalProps {
  onAuthenticate: (authenticated: boolean) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Ensure input gets focused immediately on mount
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const expected = (import.meta.env.VITE_ADMIN_PASSWORD ?? 'eladmin').toString();
    if (expected && password.trim() === expected) {
      setAdminPassword(password.trim());
      setError(null);
      onAuthenticate(true);
    } else {
      setError('Incorrect password. Password is "eladmin".');
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 pointer-events-auto select-auto"
      style={{ zIndex: 999999 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-slate-200 text-slate-900 pointer-events-auto relative z-[1000000]"
        style={{ zIndex: 1000000 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-bold text-lg">
            🔒
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Admin Dashboard Access</h2>
            <p className="text-xs text-slate-500">Authentication Required</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Admin Password
            </label>
            <input
              ref={inputRef}
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="w-full rounded-full bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800 shadow-md active:scale-95 cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-xs text-slate-400">
          Enter admin password to access settings.
        </p>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default PasswordModal;
